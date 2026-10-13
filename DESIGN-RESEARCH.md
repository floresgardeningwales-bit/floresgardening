# Flores Gardening — Selected Editorial Concept

Implemented concept 02, using the three photographs supplied by the user.

## Visual direction
- Large centred FLORES / GARDENING text above the photographs, with the official logo alone in the top-left navigation corner.
- Three full-width photo panels: garden structure on the left, lawn and blue flowers in the wider centre, flower detail on the right.
- Selected headline: A little care. A lot of life.
- Ivory and evergreen interface, editorial rules and three service introductions.
- Mobile-specific masthead sizing, image crops and stacked service introductions.

## Photos
The original supplied photographs are copied byte-for-byte into public/ with descriptive filenames. Cropping is presentational only, through CSS object-fit and object-position. No generated or stock photographs remain in the public website.

## Included functionality
Public home, services and contact pages; service navigation; postcode checker; seasonal tabs; FAQs; existing lead enquiry flow and owner dashboard.

## Review and deployment
Open DESIGN-PREVIEW.html to review the self-contained offline preview. Preview enquiries do not send or save data. Deploy the full project with the existing Next.js/Vercel setup and Supabase environment variables. No deployment was performed.

Production build, internal links, image availability and preview JavaScript syntax checked. Browser visual checks are unavailable in this environment; live enquiry submission has not been tested.

Botanical details use transparent PNG engravings rather than procedural SVG branches. Leafy sprigs frame the masthead; a separate echinacea illustrates planting. Generated with the built-in image tool: dark forest-green antique botanical copperplate engraving, fine crosshatching, natural leaf veins, transparent background, no text. Assets: public/botanical-leaf.png and public/botanical-flower.png.

Refinement: distinct dog-rose engraving at the right of the masthead and for Renew. Mobile uses one small ornament beside the subtitle, tighter spacing, and a text-presentation arrow. Built-in generation prompt: airy antique dog-rose engraving, three flowers, forest-green ink, transparent background. Asset: public/botanical-rose.png.

03 / Renew now uses a dedicated transparent bumblebee PNG (public/botanical-bee.png), generated in a matching forest-green natural-history engraving style. Dog rose remains the distinct right-hand masthead accent.

Masthead foliage grows inward from below the photo edge. Photograph strip masks stem bases; lettering remains above the illustrations. Mobile retains one smaller inward-facing rose branch anchored behind the photos.
