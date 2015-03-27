# Tournament Graphic
A demo for an interactive graphic depicting the outcomes of the 2015 NCAA men's basketball tournament.

[View demo](http://chrisvoll.github.io/tournament-graphic)

For the purposes of the demo, the winners of games that haven't been played yet are estimated based on the seed, which, as we all know, is a terrible way to guess the winner.

Built with React, Canvas, and flexbox.

### Known Issues

- Safari's flexbox support is lackluster, resulting in jarring animations
- No fallback for IE9 or other browsers that don't support flexbox or `requestAnimationFrame` yet
