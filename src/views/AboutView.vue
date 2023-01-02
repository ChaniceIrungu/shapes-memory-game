<template>
  <div>
    <!-- display the timer and progress bar -->
    <div id="timer">{{ timeLeft }} seconds remaining</div>
    <div id="progress" :style="{ width: progressWidth }"></div>

    <!-- display the game board -->
    <div id="game-board">
      <!-- v-if="currentShape === null || currentShape.id !== shape.id" -->
      <div v-for="shape in shapes" :key="shape.id" @click="checkAnswer(shape)">
        <!-- use a computed property to bind the correct class to each shape -->
        <div :class="shapeClass(shape)"></div>
      </div>
    </div>

    <!-- display the question and buttons for guessing the shape or color -->
    <div id="question" v-if="currentShape">
      <p>Is this a {{ currentShape.shape }}?</p>
      <button @click="checkMatch('shape')" :class="randomClass()">Yes</button>
      <button @click="checkMatch('shape')" :class="randomClass()">No</button>
      <p>Is this {{ currentShape.color }}?</p>
      <button @click="checkMatch('color')" :class="randomClass()">Yes</button>
      <button @click="checkMatch('color')" :class="randomClass()">No</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeLeft: 60, // start the timer at 60 seconds
      shapes: [], // array to hold the shapes
      currentShape: null, // the shape that the player is currently guessing
      currentIndex: 0, // the index of the current shape in the shapes array
    };
  },
  computed: {
    // computed property to calculate the width of the progress bar
    progressWidth() {
      return (this.timeLeft / 60) * 100 + "%";
    },
  },
  created() {
    // when the component is created, create the shapes and start the timer
    this.createShapes();
    this.startTimer();
  },
  methods: {
    // method to create the shapes and shuffle them
    createShapes() {
      // create an array of shapes
      const shapes = [
        { id: 1, shape: "square", color: "red" },
        { id: 2, shape: "square", color: "blue" },
        { id: 3, shape: "circle", color: "green" },
        { id: 4, shape: "circle", color: "yellow" },
        { id: 5, shape: "triangle", color: "purple" },
        { id: 6, shape: "triangle", color: "orange" },
      ];

      // shuffle the shapes using the Fisher-Yates shuffle algorithm
      for (let i = shapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shapes[i], shapes[j]] = [shapes[j], shapes[i]];
      }
      // select the first shape from the shuffled array and set it as the current shape
      this.currentShape = shapes[0];
      console.log("shapes at index", shapes[0]);

      // set the shapes data property to an array containing only the current shape
      this.shapes = [this.currentShape];
    },
    // method to start the timer
    startTimer() {
      const timer = setInterval(() => {
        this.timeLeft--; // decrease the time left by 1 second

        // update the progress bar
        this.progressWidth = (this.timeLeft / 60) * 100 + "%";

        if (this.timeLeft === 0) {
          clearInterval(timer); // stop the timer when it reaches 0
          alert("Time's up!"); // display a message when the timer ends
        }
      }, 1000); // run the timer every 1000 milliseconds (1 second)
    },
    // method to bind the correct class to each shape
    shapeClass(shape) {
      return `shape ${shape.shape} ${shape.color}`;
    },

    displayNextShape() {
      // get the next shape from the shuffled array
      const nextShape = this.shapes[this.currentIndex + 1];
      // update the currentShape data property with the next shape
      this.currentShape = nextShape;
      // update the shapes array to include the next shape
      this.shapes = [nextShape];
      // increase the currentIndex by 1
      this.currentIndex++;
    },

    // method to handle checking if the selected shape
    checkAnswer(shape) {
      if (this.currentShape === null) {
        // if no shape is currently selected, select this one
        // display the next shape in the shuffled array
        this.displayNextShape();
        this.currentShape = shape;
      } else {
        // if a shape is already selected, check for a match
        if (
          this.currentShape.shape === shape.shape &&
          this.currentShape.color === shape.color
        ) {
          // if the shapes match, remove them from the game board
          const index1 = this.shapes.indexOf(this.currentShape);
          const index2 = this.shapes.indexOf(shape);
          this.shapes.splice(index1, 1);
          this.shapes.splice(index2, 1);
          this.currentShape = null;
        } else {
          // if the shapes don't match, set the current shape to null
          this.currentShape = null;
        }
      }
    },
    // method to handle checking if the selected shape
    checkAnswer(response) {
      if (response === "true") {
        // User tapped true
        if (/not/i.test(this.currentstatement)) {
          // Statement is negative
          if (
            this.statementColor == this.currentColor &&
            this.statementShape == this.currentShape
          ) {
            console.log("You are wrong.");
            this.updateScore("wrong");
          } else {
            console.log("You are right.");
            this.updateScore("right");
          }
        } else {
          // Statement is positive
          if (
            this.statementColor == this.currentColor &&
            this.statementShape == this.currentShape
          ) {
            console.log("You are right.");
            this.updateScore("right");
          } else {
            console.log("You are wrong.");
            this.updateScore("wrong");
          }
        }
      }
      // User tapped false
      else if (response === "false") {
        if (/not/i.test(this.currentstatement)) {
          // Statement is negative
          if (
            this.statementColor != this.currentColor ||
            this.statementShape != this.currentShape
          ) {
            console.log("You are right.");
            this.updateScore("right");
          } else {
            console.log("You are wrong.");
            this.updateScore("wrong");
          }
        } else {
          // Statement is positive
          if (
            this.statementColor != this.currentColor ||
            this.statementShape != this.currentShape
          ) {
            console.log("You are wrong.");
            this.updateScore("wrong");
          } else {
            console.log("You are right.");
            this.updateScore("right");
          }
        }
      }
      this.createShapes();
    },
    createStatement() {
      const shape = this.shapes[Math.floor(Math.random() * this.shapes.length)];
      this.statementShape = shape;
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
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

    checkMatch(shape) {
      // generate a random number between 0 and 1
      const random = Math.random();

      // switch the yes and no buttons randomly
      if (random < 0.5) {
        return this.currentShape.shape === shape;
      } else {
        return this.currentShape.shape !== shape;
      }
    },
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
.square {
  border-radius: 0;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
.green {
  background-color: green;
}
.yellow {
  background-color: yellow;
}
.purple {
  background-color: purple;
}
.orange {
  background-color: orange;
}
button {
  width: 100px;
  height: 50px;
  font-size: 20px;
  margin: 10px;
}
</style>
