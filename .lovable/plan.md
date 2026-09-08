# Premium School Alumni Meet Invitation

## Goal
Create a competition-ready digital invitation that opens cinematically into a tactile two-page card, preserves the supplied copy and navy/ivory/gold art direction, and remains elegant on desktop, tablet, and mobile.

## Experience
- Begin with a 2–3 second emblem-led sequence: “THE MEMORIES BEGIN AGAIN”, event name, then batch, followed by a convincing invitation-opening transition.
- Build the main desktop composition as an open physical card with emotional artwork on the left and event details plus RSVP on the right.
- Stack the same two pages vertically on mobile without changing the visual identity.
- Add restrained depth, center-fold shading, pointer parallax, a soft cursor glow, grain, moving light, and floating particles with reduced-motion support.
- Create original graduation-and-friendship artwork from layered CSS/SVG-like shapes rather than a stock photograph.

## Invitation Content
- Left page: introductory label, cinematic event title, batch, three-line tagline, nostalgic school-life artwork, and closing line.
- Right page: invitation heading, supplied reunion message, date/time placeholders, venue and batch details with animated icons and dividers.
- Add “WHAT AWAITS YOU” with the five supplied numbered highlights and staggered reveal behavior.
- Add “YOUR SEAT IS WAITING” and a premium RSVP control with magnetic motion, animated edge, scale, and click ripple.

## RSVP Interaction
- Open an accessible glass-effect dialog instead of navigating away.
- Include name, email, phone, and attendance choices with clear focus and validation states.
- Support keyboard focus, Escape-to-close, click-outside close, and scroll locking.
- Replace the form with an animated checkmark and the supplied success message after valid submission; no personal details will be stored or sent.

## Study Guide
- Add a visually integrated expandable “Behind the Invitation” section after the invitation.
- Explain the semantic elements, key CSS techniques, JavaScript concepts, two-page grid, animation sequencing, and RSVP dialog in beginner-friendly language.
- Keep source organized and commented so each visual and interaction section is easy to identify.

## Technical Notes
- Implement on the required TanStack project entry route while keeping the invitation’s interaction logic native to the browser and avoiding additional UI libraries.
- Define all palette, type, lighting, shadow, timing, and texture values as semantic CSS variables in the global design system.
- Use the fixed routing structure rather than replacing the application with a standalone root HTML file; the visible result and learning-oriented structure will match the requested single-page experience.
- Use inline geometric/emblem markup and CSS artwork for speed and reliability; no external stock imagery.
- Add unique title, description, Open Graph, and Twitter metadata to the invitation route.

## Validation
- Check the opening sequence, card reveal, parallax, scroll reveals, RSVP validation, success state, keyboard behavior, and reduced-motion behavior.
- Verify at desktop and mobile sizes for overflow, readable type, coherent stacking, and non-overlapping controls.
- Confirm no browser console errors.
