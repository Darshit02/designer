import MoodBoard from "@/components/moodboard";
import { ThemeContent } from "@/components/style/theme";
import StyleGuideTypography from "@/components/style/typography";
import { TabsContent } from "@/components/ui/tabs";
import { MoodBoardImageQuery, StyleGuideQuery } from "@/convex/query.config";
import { MoodBoardImage } from "@/hooks/use-style";
import type { StyleGuide, TypographyStyle } from "@/redux/api/style-guide";
import { Tabs } from "@radix-ui/react-tabs";
import { Palette } from "lucide-react";
import React from "react";

type Props = {
  searchParams: Promise<{ project: string }>;
};





const StyleGuide = async ({ searchParams }: Props) => {
  const projectId = (await searchParams).project;

  const existingStyleGuide = await StyleGuideQuery(projectId);

  const guide = existingStyleGuide.styleGuide
    ?._valueJSON as unknown as StyleGuide;

  const colorGuide = guide?.colorSelections || [];
  const typographySelections = guide?.typographySelections || [];

  const existingMoodBoardImage = await MoodBoardImageQuery(projectId);

  const guideImages = existingMoodBoardImage.images
    ._valueJSON as unknown as MoodBoardImage[];


    

  return (
    <div>
      <TabsContent value="colours" className="space-y-8">
        {!guideImages.length ? (
          <div className="space-y-8">
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Palette className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                No colours generated yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                Upload images to your moodboard and generate an AI-powered style
                guide with colours and typography.
              </p>
            </div>
          </div>
        ) : (
          <ThemeContent colorGuide={colorGuide} />
        )}
      </TabsContent>
      <TabsContent value="typography">
        <StyleGuideTypography typographyGuide={typographySelections} />
    </TabsContent>
     <TabsContent value="moodboard">
        <MoodBoard guideImages={guideImages} />
    </TabsContent>
    </div>
  );
};

export default StyleGuide;
