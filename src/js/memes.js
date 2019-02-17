
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
               let image = new Image();

               image.onload = () => {
                 this.$canvas.height = image.height;
                 this.$canvas.width = image.width;

                 context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);
                 context.drawImage(image, 0, 0);

                 let fontSize = ((this.$canvas.width+this.$canvas.height) / 2) * 4 / 100;
                 context.font = `${fontSize}pt sans-serif`;
                 context.textAlign = 'center';
                 context.texstBaseline = 'top';

                 /**
                 * Fix lines over M
                 */
                 context.lineJoin = 'round';

                 /** Stroke Text */
                 context.lineWidth = fontSize/5;
                 context.strokeStyle = 'black';

                 /** Fill Text */
                 context.fillStyle = 'white';

                 const topText = this.$topTextInput.value.toUpperCase();
                 const bottomText = this.$bottomTextInput.value.toUpperCase();

                 // Top Text
                 context.strokeText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
                 context.fillText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));

                 // Bottom Text 
                 context.strokeText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100));
                 context.fillText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100));
               };

               image.src = reader.result;
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

    downloadMeme() {
        const imageSource = this.$canvas.toDataURL('image/png');
        let att = document.createAttribute('href');
        this.$downloadButton.setAttributeNode(att);
    }
}

new Memes();