
var STATE_GAME_NONE          = 0;
var STATE_GAME_LOADING       = 1;
var STATE_GAME_PLAYING       = 2;
var STATE_GAME_GAME_OVER     = 3;
var STATE_GAME_WIN           = 4;
var STATE_PAUSE              = 5;
var STATE_NO_CLICK           = 6;
var stateGame = STATE_GAME_NONE;
var totalTime = 15;
var speedX=1;
var speedY=.10
var Player=1;
var sequence = [];
var sequencekill = [];
var sequenceSelection = [];
var CREATE = 0;
var FULL = 1;
var StatusCreate = FULL;


var xps=350;
var yps=390;
//Estos si funcionan
/*var xps=0;
var yps=329;*/
var cont=0;

var pointerX;
var pointery;

var cardsSeleccion= [];
var Validation= [];
var Position= [];
var style;

GamePlayManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
    },
    preload: function() {
        game.load.image('background', 'assets/Img/Fondop6.jpg');
        game.load.image('tape', 'assets/Img/cinta.png');
        game.load.image('basket', 'assets/Img/caja1.png');
        //Agregar Frutas
        game.load.image('1', 'assets/Img/1.png');
        game.load.image('2', 'assets/Img/2.png');
        game.load.image('3', 'assets/Img/3.png');
        game.load.image('4', 'assets/Img/4.png');
        game.load.image('5', 'assets/Img/5.png');
        game.load.image('6', 'assets/Img/6.png');
        game.load.image('7', 'assets/Img/7.png');
        game.load.image('8', 'assets/Img/8.png');
        game.load.image('9', 'assets/Img/9.png');
        game.load.image('10', 'assets/Img/10.png');
        game.load.image('11', 'assets/Img/11.png');
        game.load.image('12', 'assets/Img/12.png');
        //Engranes        
        game.load.spritesheet('buttonPlay', 'assets/Img/buttonPlay.png', 200, 76, 2);
    
    },
    create: function() {
        
         game.input.onDown.add(this.clicked,this);
        
        this.background = game.add.sprite(0, 0, 'background');
        this.background.height=657;
        this.background.width= 1012;
        //Se agrega canasta
        this.tape = game.add.sprite(-50, (game.height/2)+60 , 'tape');
        this.tape.angle = -4;
        //this.tape.scale.setTo(0,-5);
        //this.tape.anchor.setTo(0.5, 1);
        //Se agrega cinta transportadora
        this.basket=game.add.sprite((game.width/2)+260, (game.height/2)+200 , 'basket');
        this.basket.height=365;
        this.basket.width= 253;                
        //Se crea un timer a el juego
        timer = game.time.create(false);
        //Creando el boton play
        this.buttonPlay = game.add.button(game.width/2 , game.height/2, 'buttonPlay', this.startGame, this, 1, 0, 1, 0);
        this.buttonPlay.anchor.setTo(0.5);
        //Musica de Fondo
        

        //this.loopMusic = game.add.audio('loopMusic');
         style = {
            font: 'bold 30pt Arial',
            fill: '#2560F5',
            align: 'center'
          }
        //Agregando Textos de Jugador y Timer
        this.scoreText = game.add.text(150, 40, 'Player ', style);
        this.scoreText.anchor.setTo(0.5);
        this.scoreTextPlayer = game.add.text(250, 40, Player, style);
        this.scoreTextPlayer.anchor.setTo(0.5);
        this.scoreText1 = game.add.text(750, 40, 'Timer', style);
        this.scoreText1.anchor.setTo(0.5);
        this.timerText = game.add.text(850, 40, totalTime+'', style);
        this.timerText.anchor.setTo(0.5);
        StatusPlayer="Player1";    
        
        
        this.GroupFruits = game.add.group();
        
       
    },
    
    timer:function(){
        //Timer de tiempo 15 segundos
        // se puede quitar timercreate=3;
        timer=15;     
         this.timerinitial1 = game.time.events.loop(Phaser.Timer.SECOND, function(){

             if(sequencekill.length == 15){
                 xps=0;
                 yps=390;
                 cont=0;
                for(var i=0;i<15;i++){
                    this.createFruits();
                    sequencekill = [];
                    }
                }
             this.tearing();
             timer--;
             
            // Crear cartas

             this.timerText.text = timer+'';
              if(timer==0){
                  //speedX=speedX+13.52;
                 // speedy=speedy+1;
                  timer=15;
                  //game.time.events.remove(this.timerinitial1);
              }
             
         },this);
    },
    
    startGame:function(){
        stateGame = STATE_GAME_PLAYING;
         this.buttonPlay.visible = false;
         if(stateGame == STATE_GAME_PLAYING){
                this.timer();
                 for(var i=0;i<15;i++){
                    this.createFruits();
                    }
           this.tearing();
             for(var i=0;i<5;i++){
                 this.Selection(); 
                 
                }
            console.log('sequenceSelectio',sequenceSelection);
               }
    },
    Selection:function(){
        this.scoreTextSelection = game.add.text(310, 90, 'Selecciona ', style);
        this.scoreTextSelection.anchor.setTo(0.2);       
        
        
        var num 
        num = game.rnd.integerInRange(-5, 5);
             if(num==-5){
                 fruits = game.add.sprite(490,60,'1');
                 sequenceSelection.push(fruits);
                  }
               if(num==-4){
                   fruits = game.add.sprite(490,60,'2');
                   sequenceSelection.push(fruits);
               }
               if(num==-3){
                   fruits = game.add.sprite(490,60,'3');
                   sequenceSelection.push(fruits);
                  }
               if(num==-2){
                   fruits = game.add.sprite(490,60,'4');
                   sequenceSelection.push(fruits);
                  //fruits = game.add.sprite(xps,yps,'4');
                  }
               if(num==-1){
                   fruits = game.add.sprite(490,60,'5');
                   sequenceSelection.push(fruits);
                  }
               if(num==0){
                   fruits = game.add.sprite(490,60,'6');
                   sequenceSelection.push(fruits);

                  }
               if(num==1){
                   fruits = game.add.sprite(490,60,'7');
                   sequenceSelection.push(fruits);
                  }
                if(num==2){
                  fruits = game.add.sprite(490,60,'8');
                    sequenceSelection.push(fruits);
                  }
                if(num==3){
                    fruits = game.add.sprite(490,60,'9');
                    sequenceSelection.push(fruits);
                  }
                if(num==4){
                  fruits = game.add.sprite(490,60,'10');
                    sequenceSelection.push(fruits);
                  }
                if(num==5){
                    fruits = game.add.sprite(490,60,'11');
                    sequenceSelection.push(fruits);
                  }  
    },
    createFruits:function(){

                           

        
        var num 
        var numal
        
            //quitar for   for(var i=0;i<5;i++){
               numal = game.rnd.integerInRange(-1, 1);
            //Se hacen las condiciones aleatorias para saber donde se agregaran las frutas
          
            num = game.rnd.integerInRange(-5, 5);
             if(num==-5){
                 fruits = game.add.sprite(xps,yps,'1');
                 sequence.push(fruits);
                  }
               if(num==-4){
                   fruits = game.add.sprite(xps,yps,'2');
                  //fruits = game.add.sprite(xps,yps,'2');
                   sequence.push(fruits);
                  }
               if(num==-3){
                   fruits = game.add.sprite(xps,yps,'3');
                   sequence.push(fruits);
                  }
               if(num==-2){
                   fruits = game.add.sprite(xps,yps,'4');
                  //fruits = game.add.sprite(xps,yps,'4');
                  sequence.push(fruits);
                  }
               if(num==-1){
                   fruits = game.add.sprite(xps,yps,'5');
                   sequence.push(fruits);
                  }
               if(num==0){
                   fruits = game.add.sprite(xps,yps,'6');
                   sequence.push(fruits);

                  }
               if(num==1){
                   fruits = game.add.sprite(xps,yps,'7');
                    sequence.push(fruits);
                  }
                if(num==2){
                  fruits = game.add.sprite(xps,yps,'8');
                  sequence.push(fruits);
                  }
                if(num==3){
                    fruits = game.add.sprite(xps,yps,'9');
                 sequence.push(fruits);
                  }
                if(num==4){
                  fruits = game.add.sprite(xps,yps,'10');
               sequence.push(fruits);
                  }
                if(num==5){
                    fruits = game.add.sprite(xps,yps,'11');
                  sequence.push(fruits);
                  }             
            
                //fruits.kill();  
        
               if(numal==-1){
                   var fruits = this.GroupFruits.getFirstDead();
                   if(cont==0){
                        
                      } 
                   if(cont==1){
                        yps=yps-60;
                      }
                    if(cont==2){
                        yps=yps-100;
                      }
                   cont=0;
                //   fruits.reset(xps,yps);
                                }
                                if(numal==0){
                                    var fruits = this.GroupFruits.getFirstDead();
                                     if(cont==0){
                                         yps=yps+60;
                                        } 
                                    if(cont==1){
                                        
                                        }
                                     if(cont==2){
                                         yps=yps-50;
                                     }
                                    cont=1;
                                }
                                if(numal==1){
                                    var fruits = this.GroupFruits.getFirstDead();
                                        if(cont==0){
                                         yps=yps+100;
                                        } 
                                    if(cont==1){
                                        yps=yps+40;
                                        }
                                     if(cont==2){
                                         
                                     }
                                     cont=2;
                                }
   
                xps=xps-85;
    },
    tearing:function(){ 
         
                 for(var i=0; i<sequence.length; i++){
                  if(sequence[i].y>350 && sequence[i].y<550){    
                          if(sequence[i].x>620){
                             StatusCreate = CREATE;
                              sequence[i].kill();
                              sequence.splice(i, 1);
                              game.add.sprite(620, 370 , '11');                             
                              sequencekill.push('1');
                          }
                 }
    }
    },
    clicked:function(){
        
         switch(stateGame){
            case STATE_GAME_PLAYING:
                    for(var i=0;i<sequence.length;i++){      
                      var dimensionx=sequence[i].x +67;
                      var dimensiony=sequence[i].y +58;
                      if(pointerX>sequence[i].x && pointerX< dimensionx){
                          if(pointery>sequence[i].y && pointery< dimensiony){
                              sequence[i].kill();
                              sequence.splice(i, 1);
                              console.log('Seleccion',sequence[i].key);
                          }
                      }
                    }
         }
    },
      update: function() {
        pointerX=game.input.x;
        pointery=game.input.y;
         switch(stateGame){
            case STATE_GAME_NONE:
                break;
            case STATE_GAME_LOADING:
                break;
            case STATE_GAME_PLAYING:
                 for(var i=0; i<sequence.length; i++){
                     sequence[i].x+=1 ;
                 }
                break;
            case STATE_GAME_GAME_OVER:
                break;
            case STATE_GAME_WIN:
                break;
        }
    }
    }

var game = new Phaser.Game(1012, 657, Phaser.AUTO);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");