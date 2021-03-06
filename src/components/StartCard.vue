<template>
  <transition
    name="slide-bottom-left"
    v-on:leave="onCardLeave"
  >
    <div class="card flippable"
      v-show="showStartCard"
      v-bind:class="{ flipped: isFlipped }"
    >
      <div class="card-side front">
        <div class="panda-icon-holder">
          <PandaIcon class="panda-icon"/>
        </div>
        <div class="text-group">
          <h1 class="card-header">Under the Umbrella</h1>
          <p class="card-paragraph">
            How well do you know the animals in the mountains of China?
          </p>
          <p class="card-paragraph">
            Test your ability to identify some of the animals that share a habitat with the giant panda.
          </p>
        </div>
        <button
          v-on:click="flip"
          class="card-button"
        >
          Next
        </button>
      </div>
      <div class="card-side back">
        <div class="text-group">
          <h1 class="card-header">How to play</h1>
          <p class="card-paragraph">
            Each card shows a photo taken with a camera trap in China.
          </p>
          <p class="card-paragraph">
            Select the correct name of the animal in the photo from the three choices.
          </p>
          <p class="card-paragraph">
            There are {{ cardsPerRound }} photos in a round. A panda will keep track of your score.
          </p>
          <p class="card-paragraph">
            Don't worry if you choose incorrectly: You can try again. The game randomly selects from dozens of images, so you'll get to learn something new each time!
          </p>
        </div>
        <h2 class="card-subheader bolded">
          Press Start to begin
        </h2>
      </div>
    </div>
  </transition>
</template>

<script>
import PandaIcon from '../assets/panda.svg'
export default {
  name: 'StartCard',
  components: {
    PandaIcon
  },
  props: ['showStartCard', 'cardsPerRound', 'gameIsReseting'],
  data () {
    return {
      isFlipped: false
    }
  },
  methods: {
    flip: function () {
      this.isFlipped = !this.isFlipped
      this.$emit('readyStartGame')
    },
    onCardLeave: function () {
      // Must remove the flipped transform for leave transition to work
      this.isFlipped = false
    }
  },
  watch: {
    // Flip the start card to front if flipped and change occurs during reset
    gameIsReseting: function (isResetting) {
      if (this.isFlipped && isResetting) {
        this.isFlipped = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$card-height: 85vh;
$card-width: 5 / 8 * $card-height;
$card-offset-x: -50%;
$card-offset-y: -50%;
.card {
  width: $card-width;
  height: $card-height;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX($card-offset-x) translateY($card-offset-y);

  border-style: solid;
  border-width: 8px;
  border-radius: 2em;
  border-color: #FFFFFF;
  box-shadow: 10px 20px 40px #24383A;

  .card-side {
    border-radius: 1.6em;
    width: 100%;
    height: 100%;
    box-shadow: 0px 0px 0px 8px #ff3920 inset;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    backface-visibility: hidden;

    .card-header {
      font-size: 3.6rem;
      text-align: center;
      margin-top: 0;
      margin-bottom: 1rem;
    }

    .card-subheader {
      font-size: 2.6rem;
      font-weight: 400;
      text-align: center;
      margin-top: 0;
      margin-bottom: 2.4rem;
    }

    .panda-icon-holder {
      margin-top: 2.4rem;
      display: flex;
      justify-content: center;
      
      .panda-icon {
        width: 100%;
        height: 100%;
      }
    }

    .card-paragraph {
      font-size: 2.4rem;
      font-weight: 400;
      padding-left: 2.8rem;
      padding-right: 2.8rem;
      margin-top: 1rem;
      margin-bottom: 0;
    }

    .card-button {
      padding-left: 1.8rem;
      padding-right: 1.8rem;
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      margin-bottom: 3.2rem;
    }
  }

  .front {
    background-color: #FFFFFF;
  }

  .back {
    background-color: #FFFFFF;
    position: relative;
    top: -100%;
    left: 0;
    transform: rotateY(180deg);

    .card-header {
      margin-top: 2.4rem;
    }
  }
}

.slide-bottom-left {
  transition-property: transform;
  transition-duration: 1.6s;
  transition-timing-function: cubic-bezier(0.25, -0.5, 0.25, 1.25);
  transform-origin: left;
}

// card slide animation
.slide-bottom-left-active {
  transition-delay: 0.6s;
  transition-duration: 1.2s;
}

// card slide enter animation starting position
.slide-bottom-left-enter {
  transform: rotateZ(-90deg) translateX(calc(#{-$card-width} - 7.5vh - 48px)) translateY($card-offset-y);
}

// card slide exit animation final position
.slide-bottom-left-leave-to {
  transform: rotateX(180deg) rotateZ(-90deg) translateX(calc(7.5vh + 40px)) translateY($card-offset-y);
}

.flippable {
  transition-property: transform, box-shadow;
  transition-duration: 1.2s;
  transition-timing-function: cubic-bezier(0.25, 0, 0.25, 1.1);
  transform-style: preserve-3d;
  transform-origin: left;
}

.flipped {
  transform: translateX(calc(#{$card-offset-x} + 100%)) translateY($card-offset-y) rotateY(180deg);
  transform-origin: left;
  box-shadow: -10px 20px 40px #24383A;
}
</style>

<style lang="scss">
.panda-icon-holder {
  @keyframes rollhead {
    0% {
      transform: rotateZ(0);
    }
    25% {
      transform: rotateZ(-1deg);
    }
    75% {
      transform: rotateZ(3deg);
    }
    100% {
      transform: rotateZ(0);
    }
  }

  @keyframes moveshadow {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(2px);
    }
    75% {
      transform: translateX(-9px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes blinkeyes {
    0% {
      transform: scaleY(1)
    }
    3% {
      transform: scaleY(0)
    }
    6% {
      transform: scaleY(1)
    }
  }

  @keyframes flapears {
    0% {
      transform: rotateX(0)
    }
    85% {
      transform: rotateX(0)
    }
    90% {
      transform: rotateX(-20deg)
    }
    95% {
      transform: rotateX(0deg)
    }
    100% {
      transform: rotateX(-20deg)
    }
  }

  .head {
    transform-origin: center;
    animation-duration: 5s;
    animation-name: rollhead;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  [data-name="head-shadow"] {
    transform-origin: center;
    animation-duration: 5s;
    animation-name: moveshadow;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  [data-name="ears"] {
    transform-origin: center;
    animation-duration: 6s;
    animation-name: flapears;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  .eyes {
    transform-origin: center;
    animation-duration: 4s;
    animation-name: blinkeyes;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in;
  }
}
</style>
