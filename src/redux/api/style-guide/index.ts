export interface ColorSwatch {
    name : string,
    hexColor : string,
    description? : string,
}

export interface ColorSelection {
    title : 
    | 'Primary Colours'
    | 'Secondary & Accent Colours'
    | 'UI Components Colours'
    | 'Utility & Form Colours'
    | 'Status & Feedback Colours',
    swatches : ColorSwatch[]
}

export interface TypographyStyle{
name : string,
fontFamily : string,
fontSize : string,
fontWeight : string,
lineHeight : string,
letterSpacing?: string,
description? : string,
}

export interface TypographySelection {
    title : string,
    styles : TypographyStyle[]
}
export interface StyleGuide {
    theme : string,
    description : string,
    colorSelections : [
        ColorSelection,
        ColorSelection,
        ColorSelection,
        ColorSelection,
        ColorSelection
    ]
    typographySelections : [
        TypographySelection,
        TypographySelection,
        TypographySelection,
    ]
}