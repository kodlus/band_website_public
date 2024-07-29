# About
This project is a mockup of a hypothetical band's website. It is primarily built with React and features a faux backend made with MirageJS. The highlights are:
- Storefront logic
- Asynchronous API
- CRUD operations
- Routing with React Router
- Protected routes
- Custom audio player

Run "npm run dev" to start the project.

# Media
The images used in the project are, except for the image from the Colosseum (I took that one), generated with Bing's image AI. The quality of the iterations varies quite a bit. I'm pleased with the product images, except for their spelling. The band photos are, at best, psychedelic. It is perfectly ok to laugh at the bendy guitar necks, the melted faces, and the hands with multiple fingers. 

The songs are demos made by Blåräv (I'm the band's guitarist and main songwriter) and my own home-recorded demos. Those you cannot laugh at. I'm cereal. 

# Things I would have liked to add
I'm relatively perfectionistic, and this project has dragged on for long enough. So, the features I would have liked to add are:
- Node/Express backend for password security (bcrypt) and CRUD operations. The current "backend" code is very naïve.
- JasonWebToken (JWT) for safer user verification.
- A search bar.
- Accessibility implementation, like ARIA labels.
- A bit more UI styling.

# Additional information
The website started as a handful of ideas and kept evolving throughout the project (e.g., the treemap made with D3.js). How I wrote and organized the code reflects this. In other words, the code probably looks "off" here and there. Namespace pollution, non-dry CSS, and inconsistent folder structures do occur. 

I tested the website's responsiveness on a 24-inch monitor (Firefox), a gen5 iPad from 2017 (Safari), and a Samsung Galaxy S9 (DuckDuckGo). 

# Known bugs
## Audio player
- The song title sometimes scrolls too far when the audio player initially loads
- The volume slider does not affect the volume output on iOS (at least not on my 2017 iPad)
