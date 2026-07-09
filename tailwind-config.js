// Tailwind CSS Configuration
try {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                "colors": {
                    "on-tertiary": "#ffffff",
                    "on-surface-variant": "#4A5568",
                    "on-error-container": "#93000a",
                    "primary-fixed-dim": "#ffb692",
                    "inverse-on-surface": "#edf2f7",
                    "secondary-fixed-dim": "#bec6e0",
                    "on-surface": "#0B121F",
                    "surface-bright": "#FCFBF9",
                    "on-error": "#ffffff",
                    "tertiary-container": "#FFEFE6",
                    "inverse-primary": "#ffb692",
                    "outline-variant": "#E5E0D8",
                    "on-primary-fixed-variant": "#793100",
                    "surface-container-highest": "#e5e0d8",
                    "error-container": "#ffdad6",
                    "error": "#ba1a1a",
                    "on-tertiary-fixed": "#2c1600",
                    "surface-container-lowest": "#ffffff",
                    "surface-variant": "#E5E0D8",
                    "secondary-fixed": "#dae2fd",
                    "outline": "#8b7266",
                    "surface-dim": "#FAF7F2",
                    "primary-container": "#FFEFE6",
                    "on-primary": "#ffffff",
                    "on-secondary-fixed-variant": "#3f465c",
                    "on-primary-fixed": "#341100",
                    "secondary": "#4A5568",
                    "primary": "#E05A00",
                    "primary-fixed": "#FFEFE6",
                    "on-secondary-fixed": "#131b2e",
                    "on-primary-container": "#8F3000",
                    "inverse-surface": "#1A202C",
                    "surface-tint": "#E05A00",
                    "surface-container": "#F4F1EA",
                    "on-tertiary-container": "#553000",
                    "on-secondary": "#ffffff",
                    "surface-container-low": "#FAF7F2",
                    "background": "#FCFBF9",
                    "on-secondary-container": "#5c647a",
                    "secondary-container": "#dae2fd",
                    "tertiary-fixed": "#ffdcbd",
                    "on-background": "#0B121F",
                    "surface-container-high": "#FAF7F2",
                    "on-tertiary-fixed-variant": "#683c00",
                    "surface": "#FCFBF9",
                    "tertiary": "#855316",
                    "tertiary-fixed-dim": "#fcb973"
                },
                "borderRadius": {
                    "sm": "0.25rem",
                    "DEFAULT": "0.5rem",
                    "md": "0.75rem",
                    "lg": "1rem",
                    "xl": "1.5rem",
                    "full": "9999px"
                },
                "spacing": {
                    "margin-mobile": "16px",
                    "container-max": "1280px",
                    "stack-sm": "12px",
                    "gutter": "24px",
                    "margin-desktop": "40px",
                    "stack-lg": "48px",
                    "base": "8px",
                    "stack-md": "24px"
                },
                "fontFamily": {
                    "label-sm": ["Inter"],
                    "body-md": ["Inter"],
                    "display-lg": ["Outfit"],
                    "body-lg": ["Inter"],
                    "headline-md": ["Outfit"],
                    "display-lg-mobile": ["Outfit"]
                },
                "fontSize": {
                    "label-sm": ["14px", {"lineHeight": "20px", "fontWeight": "600"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
                    "display-lg-mobile": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700"}]
                }
            },
        },
    };
} catch (_e) {}
