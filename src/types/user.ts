import { combinedSlug } from "@/lib/utils"

export type ConvexUserRaw = {
    _creationTime : number
    _id : string
    email : string
    emailVerificationTime? : number
    image? : string
    name? :string
}
export type Profile = {
    id : string
    createdAtMs : number
    email : string
    emailVerifiedMs? : number
    image? : string
    name? : string 
}

export const normalizeProfile = (raw : ConvexUserRaw | null) : Profile | null => {
    if (!raw) {
        return null;
    }
    const extrectNameFromEmail = (email : string) : string => {
        const username = email.split('@')[0];
        return username.split(/[._-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    }
    const name = combinedSlug(raw.name!) || extrectNameFromEmail(raw.email);

    return {
        id : raw._id,
        createdAtMs : raw._creationTime,
        email : raw.email,
        emailVerifiedMs : raw.emailVerificationTime,
        image : raw.image,
        name,
    }
}