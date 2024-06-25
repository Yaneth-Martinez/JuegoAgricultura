
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


var xps=350;
var yps=350;
//Estos si funcionan
/*var xps=0;
var yps=329;*/
var cont=0;

var FrutsCreate={
        "cards":[
            {'Id':"0",'sprite':"resistencia","x0":125,"y0":70,'textura':""},
            {'Id':"1",'sprite':"resistencia1","x0":300,"y0":70,'textura':""},
            {'Id':"2",'sprite':"resistencia2","x0":475,"y0":70,'textura':""},
            {'Id':"3",'sprite':"resistencia","x0":650,"y0":70,'textura':""},
            {'Id':"4",'sprite':"resistencia1","x0":125,"y0":245,'textura':""},
            {'Id':"5",'sprite':"resistencia2","x0":300,"y0":245,'textura':""},
            {'Id':"6",'sprite':"resistencia","x0":475,"y0":245,'textura':""},
            {'Id':"7",'sprite':"resistencia","x0":650,"y0":245,'textura':""},
            {'Id':"8",'sprite':"resistencia","x0":125,"y0":420,'textura':""},
            {'Id':"9",'sprite':"resistencia","x0":300,"y0":420,'textura':""},
            {'Id':"10",'sprite':"resistencia","x0":475,"y0":420,'textura':""},
            {'Id':"11",'sprite':"resistencia","x0":650,"y0":420,'textura':""},
            {'Id':"11",'sprite':"resistencia","x0":650,"y0":420,'textura':""}
        ]
    } 


var CarsCreate={
        "cards":[
            {'Id':"0",'sprite':"resistencia","x0":125,"y0":70,'textura':""},
            {'Id':"1",'sprite':"resistencia1","x0":300,"y0":70,'textura':""},
            {'Id':"2",'sprite':"resistencia2","x0":475,"y0":70,'textura':""},
            {'Id':"3",'sprite':"resistencia","x0":650,"y0":70,'textura':""},
            {'Id':"4",'sprite':"resistencia1","x0":125,"y0":245,'textura':""},
            {'Id':"5",'sprite':"resistencia2","x0":300,"y0":245,'textura':""},
            {'Id':"6",'sprite':"resistencia","x0":475,"y0":245,'textura':""},
            {'Id':"7",'sprite':"resistencia","x0":650,"y0":245,'textura':""},
            {'Id':"8",'sprite':"resistencia","x0":125,"y0":420,'textura':""},
            {'Id':"9",'sprite':"resistencia","x0":300,"y0":420,'textura':""},
            {'Id':"10",'sprite':"resistencia","x0":475,"y0":420,'textura':""},
            {'Id':"11",'sprite':"resistencia","x0":650,"y0":420,'textura':""},
        ]
    } 


var pointerX;
var pointery;
var arraycards = [CarsCreate.cards.length];
var cardsTargets= [CarsCreate.cards.length];
var cardsSeleccion= [];
var Validation= [];
var Position= [];

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
        
        
        
        this.background = game.add.sprite(0, 0, 'background');
        this.background.height=657;
        this.background.width= 1012;
        //Se agrega canasta
        this.tape = game.add.sprite(0, game.height/2 , 'tape');
        //Se agrega cinta transportadora
        this.basket=game.add.sprite((game.width/2)+260, (game.height/2)+200 , 'basket');
        this.basket.height=165;
        this.basket.width= 253;                
        //Se crea un timer a el juego
        timer = game.time.create(false);
        //Creando el boton play
        this.buttonPlay = game.add.button(game.width/2 , game.height/2, 'buttonPlay', this.startGame, this, 1, 0, 1, 0);
        this.buttonPlay.anchor.setTo(0.5);
        //Musica de Fondo
        

        //this.loopMusic = game.add.audio('loopMusic');
         var style = {
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
        for(var i=0; i<15; i++){
            num = game.rnd.integerInRange(-5, 5);
             if(num==-5){
                 var fruits = this.GroupFruits.create(0, 0, '1');
                  }
               if(num==-4){
                   var fruits = this.GroupFruits.create(0, 0, '2');
                  //fruits = game.add.sprite(xps,yps,'2');
                   //sequence.push(fruits);
                  }
               if(num==-3){
                   var fruits = this.GroupFruits.create(0, 0, '3');

                  }
               if(num==-2){
                   var fruits = this.GroupFruits.create(0, 0, '4');
                  //fruits = game.add.sprite(xps,yps,'4');
                  //sequence.push(fruits);
                  }
               if(num==-1){
                   var fruits = this.GroupFruits.create(0, 0, '5');

                  }
               if(num==0){
                   var fruits = this.GroupFruits.create(0, 0, '6');

                  }
               if(num==1){
                   var fruits = this.GroupFruits.create(0, 0, '7');
               
                  }
                if(num==2){
                    var fruits = this.GroupFruits.create(0, 0, '8');
                  
                  }
                if(num==3){
                    var fruits = this.GroupFruits.create(0, 0, '9');
                 
                  }
                if(num==4){
                    var fruits = this.GroupFruits.create(0, 0, '10');
               
                  }
                if(num==5){
                    var fruits = this.GroupFruits.create(0, 0, '11');
                  
                  }             
            
                fruits.kill();  
        }
        //Se crean las primeras frutas
        
/*
        var num
         
        var numal
        var cont=0;
           for(var i=0;i<5;i++){
               numal = game.rnd.integerInRange(-1, 1);
               num = game.rnd.integerInRange(-5, 5);
               //Se hacen las condiciones aleatorias para saber donde se agregaran las frutas
               if(numal==-1){
                   if(cont==0){
                        yps=yps+3;
                        
                      } 
                   if(cont==1){
                        yps=yps-60;
                        cont=0;
                        yps=yps+2;
                      }
                    if(cont==2){
                        yps=yps-120;
                        cont=0;
                         yps=yps+3;
                      }
                        cont=0;
                                }
                                if(numal==0){
                                     if(cont==0){
                                         yps=yps+60;
                                          yps=yps+1;
                                        } 
                                    if(cont==1){
                                         yps=yps+3;
                                        
                                        }
                                     if(cont==2){
                                         yps=yps-60;
                                          yps=yps+2;
                                         cont=0;
                                     }
                                    cont=1;
                                }
                                if(numal==1){
                                        if(cont==0){
                                         yps=yps+120;
                                             yps=yps+2;
                                        } 
                                    if(cont==1){
                                        yps=yps+60;
                                         yps=yps+1;
                                        }
                                     if(cont==2){
                                          yps=yps+3;
                                         
                                     }
                                     cont=2;
                                }
               //Se hacen las condiciones para saber que fruta agregar 
               if(num==-5){
                  fruits = game.add.sprite(xps,yps,'1');
                   sequence.push(fruits);
                  }
               if(num==-4){
                  fruits = game.add.sprite(xps,yps,'2');
                   sequence.push(fruits);
                  }
               if(num==-3){
                  fruits = game.add.sprite(xps,yps,'3');
                   sequence.push(fruits);
                  }
               if(num==-2){
                  fruits = game.add.sprite(xps,yps,'4');
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

               xps=xps+85;
               yps=yps+2;
        
        } */
    },
    
    timer:function(){
        //Timer de tiempo 15 segundos
        // se puede quitar timercreate=3;
        timer=15;     
         this.timerinitial1 = game.time.events.loop(Phaser.Timer.SECOND, function(){
             console.log('entra timer');
             timer--;
             
            // Crear cartas
             // se puede quitar timercreate--;
             // se puede quitar if(timercreate==0){
                // se puede quitar  this.createFruits();
                // se puede quitar timercreate=7;
                
              // se puede quitar  }
             
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
        console.log('Entra');
        stateGame = STATE_GAME_PLAYING;
         this.buttonPlay.visible = false;
         if(stateGame == STATE_GAME_PLAYING){
                this.timer();
              console.log('cont debe ser 4',cont);
                 for(var i=0;i<15;i++){
                    
                    this.createFruits();
                    }
               }
    },
    createFruits:function(){

                           

        
        var num 
        var numal
        
        //quitar for   for(var i=0;i<5;i++){
               numal = game.rnd.integerInRange(-1, 1);
               num = game.rnd.integerInRange(-5, 5);
        console.log('numal',numal);
               //Se hacen las condiciones aleatorias para saber donde se agregaran las frutas
          
        
        
               if(numal==-1){
                   var fruits = this.GroupFruits.getFirstDead();
                   sequence.push(fruits);
                   if(cont==0){
                        yps=yps+3;
                        
                      } 
                   if(cont==1){
                        yps=yps-60;
                        yps=yps+2;
                      }
                    if(cont==2){
                        yps=yps-100;
                         yps=yps+3;
                      }
                   cont=0;
                   console.log('cont debe ser 0',cont);
                //   fruits.reset(xps,yps);
                                }
                                if(numal==0){
                                    var fruits = this.GroupFruits.getFirstDead();
                                    sequence.push(fruits);
                                     if(cont==0){
                                         yps=yps+60;
                                          yps=yps+1;
                                        } 
                                    if(cont==1){
                                        
                                        }
                                     if(cont==2){
                                         yps=yps-60;
                                          yps=yps+2;
                                     }
                                    cont=1;
                                    console.log('cont debe ser 1',cont);
                                    //fruits.reset(xps,yps);
                                }
                                if(numal==1){
                                    var fruits = this.GroupFruits.getFirstDead();
                                    sequence.push(fruits);
                                        if(cont==0){
                                         yps=yps+100;
                                             yps=yps+2;
                                        } 
                                    if(cont==1){
                                        yps=yps+40;
                                         yps=yps+1;
                                        }
                                     if(cont==2){
                                         
                                     }
                                     cont=2;
                                    console.log('cont debe ser 2',cont);
                                //    fruits.reset(xps,yps);
                                }
               //Se hacen las condiciones para saber que fruta agregar 
              
        
               //Si
                xps=xps-85;
               yps=yps-10;
        
               
    //quitar for    } 
        
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
                      //fruits.x+=speedX;
                      //fruits.y+=speedY;
                      //fruits.reset(xps,yps);
                     sequence[i].x+=speedX;
                     sequence[i].y+=speedY;
                      
                      game.add.sprite(350, 380 , '11');
                      //game.add.sprite(xps,yps,'3');
                  
                      
                      if(sequence[i].y>380 && sequence[i].y<500){
                          if(sequence[i].x>670){
                              sequence[i].kill();
                              this.createFruits();
                             //fruits.kill(); 
                             // console.log('borrar fruits',fruits.length);
                             }                          
                         }
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