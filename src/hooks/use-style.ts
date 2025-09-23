"use client";
import { useMutation } from "convex/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

export interface MoodBoardImage {
  id: string;
  file?: File;
  preview: string;
  storageId?: string;
  uploaded: boolean;
  uploading: boolean;
  error?: string;
  url?: string;
  isFormServer?: boolean;
}

interface StylesFormData {
  images: MoodBoardImage[];
}

export const useMoodBoard = (guideImages: MoodBoardImage[]) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");

  const form = useForm<StylesFormData>({
    defaultValues: {
      images: [],
    },
  });

  const { watch, setValue, getValues } = form;
  const images = watch("images");
  const generateUploadUrl = useMutation(api.moodboard.generateUploadUrl);
  const removeMoodboardImage = useMutation(api.moodboard.removeMoodBoardImage);
  const addMoodBoardImage = useMutation(api.moodboard.addMoodBoardImage);
  const uploadImage = async (
    file: File
  ): Promise<{ storageId: string; url?: string }> => {
    const uploadUrl = await generateUploadUrl();
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!result.ok) {
      throw new Error(`Upload failed : ${result.statusText}`);
    }
    const { storageId } = await result.json();

    if (projectId) {
      await addMoodBoardImage({
        projectId: projectId as Id<"projects">,
        storageId: storageId as Id<"_storage">,
      });
    }
    return { storageId };
  };

  useEffect(() => {
    if (guideImages && guideImages.length > 0) {
      const serverImages: MoodBoardImage[] = guideImages.map((img: any) => ({
        id: img.id,
        preview: img.url,
        storageId: img.storageId,
        uploaded: true,
        uploading: false,
        url: img.url,
        isFormServer: true,
      }));
      const currentImages = getValues("images");
      if (currentImages.length === 0) {
        setValue("images", serverImages);
      } else {
        const mergedImages = [...currentImages];
        serverImages.forEach((serverImages) => {
          const clientIndex = mergedImages.findIndex(
            (clientImages) => clientImages.storageId === serverImages.storageId
          );

          if (clientIndex !== -1) {
            if (mergedImages[clientIndex].preview.startsWith("blob:")) {
              URL.revokeObjectURL(mergedImages[clientIndex].preview);
            }

            mergedImages[clientIndex] = serverImages;
          }
        });
        setValue("images", mergedImages);
      }
    }
  }, [guideImages, setValue, getValues]);

  const addImage = (file: File) => {
    if (images.length >= 5) {
      toast.error("Maximum 5 image allowed");
      return;
    }

    const newImage: MoodBoardImage = {
      id: `${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      uploaded: false,
      uploading: false,
      isFormServer: false,
    };
    const uploadImages = [...images, newImage];
    setValue("images", uploadImages);
    toast.success("Image uploaded sucessfuly");
  };
  const removeImage = async (imageId: string) => {
    const imageToRemove = images.find((img) => img.id === imageId);

    // If image doesn't exist, stop here
    if (!imageToRemove) return;

    // If the image exists and it's from the server, remove it
    if (imageToRemove.isFormServer && imageToRemove.storageId && projectId) {
      try {
        await removeMoodboardImage({
          projectId: projectId as Id<"projects">,
          storageId: imageToRemove.storageId as Id<"_storage">,
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to remove image from server");
        return;
      }
    }

    const updatedImages = images.filter((img) => {
      if (img.id === imageId) {
        if (!img.isFormServer && img.preview.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }
        return false;
      }
      return true;
    });

    setValue("images", updatedImages);
    toast.success("Image removed");
  };

  const handlDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      toast.error("Please drop image files only");
      return;
    }

    imageFiles.forEach((file) => {
      if (images.length < 5) {
        addImage(file);
      }
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => addImage(file));
    e.target.value = "";
  };
  useEffect(() => {
    const uploadPendingImages = async () => {
      const currentImages = getValues("images");
      for (let i = 0; i < currentImages.length; i++) {
        const image = currentImages[i];
        if (!image.uploaded && !image.uploading && !image.error) {
          const updatedImages = [...currentImages];
          updatedImages[i] = { ...image, uploading: true };
          setValue("images", updatedImages);
          try {
            const { storageId } = await uploadImage(image.file!);
            const finalImages = getValues("images");
            const finalIndex = finalImages.findIndex(
              (img) => img.id === image.id
            );
            if (finalIndex !== -1) {
              finalImages[finalIndex] = {
                ...finalImages[finalIndex],
                storageId,
                uploaded: true,
                uploading: false,
                isFormServer: true,
              };
              setValue("images", [...finalImages]);
            }
          } catch (error) {
            console.error(error);
            const errorImages = getValues("images");
            const errorIndex = errorImages.findIndex(
              (img) => img.id === image.id
            );
            if (errorIndex !== -1) {
              errorImages[errorIndex] = {
                ...errorImages[errorIndex],
                uploading: false,
                error: "Upload Failed",
              };
              setValue("images", [...errorImages]);
            }
          }
        }
      }
    };
    if (images.length > 0) {
      uploadPendingImages();
    }
  }, [images, setValue, getValues]);
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, []);

  return {
    form,
images,
dragActive,
addImage,
removeImage,
handlDrag,
handleDrop,
handleFileInput,
canAddMore : images.length <  5
  }
};
