# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Daymon Littrell**

Time spent: **4** hour spent in total

[Link to project](https://truth-noiseless-degree.glitch.me/)

## Required Functionality

The following **required** functionality is complete:

- [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [x] "Start" button toggles between "Start" and "Stop" when clicked.
- [x] Game buttons each light up and play a sound when clicked.
- [x] Computer plays back sequence of clues including sound and visual cue for each button
- [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [x] User wins the game after guessing a complete pattern
- [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [x] Buttons use a pitch (frequency) other than the ones in the tutorial
- [x] More than 4 functional game buttons
- [x] Playback speeds up on each turn
- [x] Computer picks a different pattern each time the game is played
- [x] Player only loses after 3 mistakes (instead of on the first mistake)
- [x] Game button appearance change goes beyond color (e.g. add an image)
- [-] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [x] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] A tooltip system for the options in the form of a '?'
- [x] A Neverending gamemode
- [x] Various selectable difficulties
- [x] Incremental sounds for the nodes according to color (white = highest pitch, grey = lowest pitch)
- [x] Last Straw setting that allows the User to play with only one life
- [x] A score system that keeps track of the highest score in real time- with multipliers according to settings
- [x] OOP based implementation
- [x] Dynamic Board loading
- [x] Fixed a cheating bug where the user could click during playback

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<details>
  <summary>Overall Showcase</summary>
   <img src="http://g.recordit.co/7erE1C0AaL.gif" style="width:200px;">
</details>
<details>
  <summary>Difficulty Showcase</summary>
   <img src="http://g.recordit.co/8h5y0SL9Xd.gif" style="width:200px;">
</details>
<details>
  <summary>Speed Showcase</summary>
   <img src="http://g.recordit.co/sW1AVaDzfk.gif" style="width:200px;">
</details>
<details>
  <summary>Timer Showcase</summary>
   <img src="http://g.recordit.co/ERoWxCz0kl.gif" style="width:200px;">
</details>
<details>
  <summary>Lifes/Last Straw Showcase</summary>
   <img src="http://g.recordit.co/RjlVW63nTQ.gif" style="width:200px;">
</details>
<details>
  <summary>Winning Showcase</summary>
   <img src="http://g.recordit.co/3XBf4bFBtd.gif" style="width:200px;">
</details>


## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.
   [The Bootstrap documentation](https://getbootstrap.com/docs/4.3/) & [Javascript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)
   Most of the features were painless to implement, but what stood out to me as a challenge was
   debugging the Sound Synthesizer. I never have utilized the _AudioContext_ oject in Javascript
   before, or done much sound work in the browser at all to be completely honest, so I ran into
   some very niche issues. For example, I had a hard time attempting to make the sound of the notes
   align with the clicking of the node (versus coming after). Initially, I just removed the padding
   added to the context. And that worked, until it didnt. After a little while it would fall off
   beat again. I started doing some debugging in the form of documentation reading, and following
   the call stack line by line. The issue ended up being that _AudioContext_ objects can actually
   become out of sync over time and load. This is actually something out of the realm of my abilitiy
   to fix reliably, so I just added some timing mechanisims to potentially ease the issue.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)
   Playing around with the audio synthesizer was a lot of fun, it was something I hadn't touched
   on before. I'm very curious about the implemntations that other services utilize for their sound
   systems. I've spent a lot of time practicing deabstractation, and I would love to practice that in regards
   to the foundational blocks of web development. Especially when theres a lot of bloaded development in Javascript.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)
   I would redesgin this from the ground up, and craft a more modernized front-end. I would also most deffinitely
   do this in react/typescript as well, as that speeds up development and testing significantly. A level system
   could also be a really cool implementation, with a leaderboards and such.

## License

    Copyright Daymon Littrell

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
