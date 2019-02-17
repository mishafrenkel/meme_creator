
import './general.js';

const deviceWidth = window.innerWidth; //#endregion

class Memes {
    constructor() {
        this.$canvas = document.querySelector('#imgCanvas');
        this.$topTextInput = document.querySelector('#topText');
        this.$bottomTextInput = document.querySelector('#bottomText');
        this.$imageInput = document.querySelector('#image');
        this.$downloadButton = document.querySelector('#downloadMeme');
  
        this.createCanvas();
        this.addEventListeners();
    }

    createCanvas() {
        let canvasHeight = Math.min(480, deviceWidth-30);
        let canvasWidth = Math.min(640, deviceWidth-30);
    
        this.$canvas.height = canvasHeight;
        this.$canvas.width = canvasWidth;
    }
    createMeme() {
       let context = this.$canvas.getContext('2d');
       if (this.$imageInput.files && this.$imageInput.files[0]) {
           let reader = new FileReader();
           
           reader.onload = () => {
               console.log('file completely read');
           };
           reader.readAsDataURL(this.$imageInput.files[0]);
           console.log('This will get printed first!');
       }
    }

    addEventListeners() {
        this.createMeme = this.createMeme.bind(this);
        // this.downloadMeme = this.downloadMeme.bind(this);
        let inputNodes = [this.$topTextInput, this.$bottomTextInput, this.$imageInput];
    
        inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
        inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
        this.$downloadButton.addEventListener('click', this.downloadMeme);
    }
}

new Memes();