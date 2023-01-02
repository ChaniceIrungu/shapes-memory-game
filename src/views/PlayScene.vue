<template>
  <div style="">
    <!-- display the timer and progress bar -->
    <div id="timer" class="pt-2 font-bold text-base">
      {{ timeLeft }} seconds remaining
    </div>
    <div id="progress" :style="{ width: progressWidth }"></div>
    <div class="font-bold text-base">score: {{ this.score }}</div>
    <!-- display the game board -->
    <div class="pb-12">
      <h3
        id="statement-container"
        ref="statementContainer"
        class="text-xl text-center font-bold"
      ></h3>
    </div>

    <div
      id="shape-container"
      ref="shapeContainer"
      class="flex justify-center"
    ></div>
    <!-- show true button first -->
    <div v-show="showTrueButtonFirst" class="flex justify-between px-4 mt-28">
      <!-- false button left -->
      <div class="h-24 w-24">
        <img
          ref="false-button"
          src="../assets/False.png"
          @click="checkAnswer('false')"
          class="h-full"
        />
      </div>
      <!-- true button on right side -->
      <div class="h-24 w-24">
        <img
          src="../assets/True.png"
          ref="true-button"
          @click="checkAnswer('true')"
        />
      </div>
    </div>
    <div v-show="!showTrueButtonFirst" class="flex justify-between px-4 mt-28">
      <!-- true button on left side -->
      <div class="h-24 w-24">
        <img
          src="../assets/True.png"
          ref="true-button"
          @click="checkAnswer('true')"
        />
      </div>
      <!-- false button right -->
      <div class="h-24 w-24">
        <img
          ref="false-button"
          src="../assets/False.png"
          @click="checkAnswer('false')"
          class="h-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLeft: 30, // start the timer at 60 seconds
      duration: 30,
      score: 0,
      correct: 0,
      wrong: 0,
      progressWidth: null,
      shapes: ["circle", "square"],
      colors: ["red", "blue", "green", "purple", "orange", "yellow"],
      statementTemplates: [
        "It's a {color} {Shape}",
        "It's not a {color} {Shape}",
      ],
      showTrueButtonFirst: true,
      buttonClickCounter: 0,
      statementTemplate: null,
      currentstatement: null,
      currentShape: null,
      currentColor: null,
      statementShape: null,
      statementColor: null,
    };
  },
  unmounted() {
    //make sure to clear the timer when moving to another view
    clearInterval(this.timer);
  },

  mounted() {
    // when the component is mounted, create the shapes and start the timer
    (this.shapeContainerRef = "shapeContainer"),
      (this.statementContainerRef = "statementContainer"),
      this.createShapes();
    this.startTimer();
  },
  // computed: {
  //   showTrueButtonFirst() {
  //     return this.buttonClickCounter % 2 === 0;
  //   },
  // },

  methods: {
    // method to start the timer
    startTimer() {
      this.timer = setInterval(() => {
        this.timeLeft--; // decrease the time left by 1 second

        // update the progress bar
        this.progressWidth = (this.timeLeft / this.duration) * 100 + "%";

        if (this.timeLeft <= 0) {
          clearInterval(this.timer); // stop the timer when it reaches 0
          this.buttonClickCounter = 0;
          localStorage.setItem("score", this.score);
          localStorage.setItem("correct", this.correct);
          localStorage.setItem("wrong", this.correct);
          this.goToOtherPage("time-up"); // display a message when the timer ends
        }
      }, 1000); // run the timer every 1000 milliseconds (1 second)
    },
    // method to handle checking if the selected shape
    checkAnswer(response) {
      // Check whether the user tapped true or false
      const isTrue = response === "true";
      const isFalse = response === "false";
      // Check whether the current statement is negative or positive
      const isNegative = /not/i.test(this.currentstatement);
      // Check whether the statement and current shape match
      const isMatch =
        this.statementColor == this.currentColor &&
        this.statementShape == this.currentShape;

      // Log the appropriate message and update the score based on the above checks
      if (isTrue) {
        if (isNegative) {
          if (isMatch) {
            console.log("You are wrong.");
            this.updateScore("wrong");
          } else {
            console.log("You are right.");
            this.updateScore("right");
          }
        } else {
          if (isMatch) {
            console.log("You are right.");
            this.updateScore("right");
          } else {
            console.log("You are wrong.");
            this.updateScore("wrong");
          }
        }
      }
      // player tapped false
      else if (isFalse) {
        if (isNegative) {
          if (isMatch) {
            console.log("You are right.");
            this.updateScore("right");
          } else {
            console.log("You are wrong.");
            this.updateScore("wrong");
          }
        } else {
          if (isMatch) {
            console.log("You are wrong.");
            this.updateScore("wrong");
          } else {
            console.log("You are right.");
            this.updateScore("right");
          }
        }
      } else {
        console.log("Invalid response. Please tap true or false.");
      }

      // Increment the button click counter
      this.buttonClickCounter++;

      this.interchangeButtons();

      this.createShapes();
    },

    updateScore(result) {
      if (result === "right") {
        this.score += 50;
        this.correct++;
      } else if (result === "wrong") {
        this.score -= 20;
        this.wrong++;
      }
    },
    interchangeButtons() {
      // select the false and true buttons
      if (this.buttonClickCounter % 3 === 0) {
        this.showTrueButtonFirst = false;
      } else if (this.buttonClickCounter % 2 === 0) {
        this.showTrueButtonFirst = true;
      }
    },

    // method to create the shapes
    createShapes() {
      // create statement when shape is created
      this.createStatement();
      // randomize shape creation
      const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
      this.currentShape = shape;

      // randomize color creation
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.currentColor = color;

      if (shape == "circle") {
        this.$refs[this.shapeContainerRef].innerHTML = `
        <svg width="177" height="177" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="88.5" cy="88.5" r="81.5" stroke="${color}" stroke-width="14"/>
          </svg>`;
      } else {
        this.$refs[this.shapeContainerRef].innerHTML = `
        <svg width="177" height="177" viewBox="0 0 177 177" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="7" width="163" height="163" stroke="${color}" stroke-width="14"/>
            </svg>`;
      }
    },

    createStatement() {
      // Randomly select a shape and color that match the current shape and color
      // with a probability of 1/3
      let shape;
      let color;
      if (Math.random() < 1 / 4) {
        shape = this.currentShape;
        color = this.currentColor;
      } else {
        // Otherwise, randomly select a shape and color as before
        shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
        color = this.colors[Math.floor(Math.random() * this.colors.length)];
      }
      this.statementShape = shape;
      this.statementColor = color;
      this.statementTemplate =
        this.statementTemplates[
          Math.floor(Math.random() * this.statementTemplates.length)
        ];

      if (/not/i.test(this.statementTemplate)) {
        // if -ve
        this.$refs[
          this.statementContainerRef
        ].innerHTML = `It's not a ${color} ${shape}`;
        this.currentstatement = this.statementTemplate;
      } else {
        //if +ve
        this.$refs[
          this.statementContainerRef
        ].innerHTML = `It's a ${color} ${shape}`;
        this.currentstatement = this.statementTemplate;
      }
    },

    // method to navigate other pages
    goToOtherPage(page) {
      this.$router.push(`${page}`);
    },
    // method to bind the correct class to each shape
    shapeClass(shape) {
      return `shape ${shape.shape} ${shape.color}`;
    },

    displayNextShape() {},
  },
};
</script>
<style scoped>
#timer {
  font-size: 20px;
  margin-bottom: 10px;
}
#progress {
  height: 20px;
  background-color: lightgrey;
  margin-bottom: 20px;
}
#game-board {
  display: flex;
  flex-wrap: wrap;
}
.shape {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid black;
}

button {
  width: 100px;
  height: 50px;
  font-size: 20px;
  margin: 10px;
}
</style>