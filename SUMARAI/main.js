
    /** Animation with independent images **/
window.onload = myGame;

enchant();

function myGame() {
    // New game with a 320x320 pixel canavs, 24 frames/sec.
    var SUPER=7;
    var game = new Core(800, 300);
    game.fps = 24;
    game.preload('cutleft.jpg','cutright.jpg','run.jpg','chopright.jpg','chopleft.jpg','defendleft.jpg','defendright.jpg','run_.jpg','waterbg.jpg','bluerunleft.jpg','bluerunright.jpg','bluechopright.jpg','bluechopleft.jpg','start.jpg','chopped.mp3','bluecutleft.jpg','bluecutright.jpg','strike.mp3','hero_super_a.jpg','hero_super_b.jpg','hero_super_a_.jpg','hero_super_b_.jpg','bluedefendleft.jpg','bluedefendright.jpg','superblueleft.jpg','superblueright.jpg','superbluerushright.jpg','superbluerushleft.jpg','run.mp3','bluerun.mp3','herowin.jpg','rivalwin.jpg');
    
    
     game.onload = function () {
        var startbg=new Sprite(800,300);
        game.chopped=game.assets['chopped.mp3'];
        game.getcut=game.assets['getcut.mp3'];
        game.strike=game.assets['strike.mp3'];
        game.run=game.assets['run.mp3'];
        game.bluerun=game.assets['bluerun.mp3'];
        startbg.image=game.assets['start.jpg'];
        game.rootScene.addChild(startbg);
        game.keybind('13','down');
        game.rootScene.addEventListener(Event.DOWN_BUTTON_DOWN,function(e){
        game.pushScene(combatscene());
            //confirm('shit');
        });
        //game.addEventListener(Event.DOWN_BUTTON_DOWN,function(e){
       // game.pushScene(combatscene());
            //confirm('shit');
      //  });
     };
    
    
    game.start();
    function combatscene()
    {
        game.keyunbind('13');
        var scene=new Scene();
        var frame_cut=14;
        var cur_frame=0;
        var rival_frame=0;
        var background;
        var hero_run=false;
        var rival_run=false;
        var hero_direc='right';
        var rival_direc='left';
        var hero_cut=false;
        var rival_cut=false;
        var hero_chop=false;
        var rival_cut=false;
        var rival_chop=false;
        var hero_defend=false;
        var rival_defend=false;
        var hero_remain=300;
        var rival_remain=300; 
        var super_store=0;
        var hero_super_run=false;
        var hero_super=false;
        var hero_super_state='c';
        var rival_super_run=false;
        var rival_super=false;
        var rival_super_state=0;
        var isrivalrun=false;
       // var jpress=false;
        // Preload assets.
        

        // Specify what should happen when the game loads.
       
            background = new Sprite(800, 300);  // 
            background.x = background.y = 0;    // Sprite 
            background.image = game.assets['waterbg.jpg']; // bg.png 
            

           /* var label=new Label();
        //label.background='purple';
            label.color='yellow';
            label.font='7px';
        //label.style.background='purple';
            label.text='this is health';
            label.x=30;
            label.y=28;
*/

            var hero_health=new Sprite(300,10);
            hero_health.x=30;
            hero_health.y=10;
            hero_health.backgroundColor='red';
            var hero_frame=new Sprite(306,16);
            hero_frame.x=27;
            hero_frame.y=7;
            hero_frame.backgroundColor='green';

            var hero_health_bg=new Sprite(300,10);
            hero_health_bg.x=30;
            hero_health_bg.y=10;
            hero_health_bg.backgroundColor='yellow';

            var rival_health=new Sprite(300,10);
            rival_health.x=440;
            rival_health.y=10;
            rival_health.backgroundColor='red';
            var rival_frame=new Sprite(306,16);
            rival_frame.x=437;
            rival_frame.y=7;
            rival_frame.backgroundColor='green';
            
            var rival_health_bg=new Sprite(300,10);
            rival_health_bg.x=440;
            rival_health_bg.y=10;
            rival_health_bg.backgroundColor='yellow';

        
            var hero_power=new Sprite(200,10);
            hero_power.x=30;
            hero_power.y=40;
            hero_power.backgroundColor='purple';
        
            var hero_power_bg=new Sprite(200,10);
            hero_power_bg.x=30;
            hero_power_bg.y=40;
            hero_power_bg.backgroundColor='yellow';
        
            var hero_power_frame=new Sprite(206,16);
            hero_power_frame.x=27;
            hero_power_frame.y=37;
            hero_power_frame.backgroundColor='green';
        
        
            var rival_power=new Sprite(200,10);
            rival_power.x=540;
            rival_power.y=40;
            rival_power.backgroundColor='purple';
        
            var rival_power_bg=new Sprite(200,10);
            rival_power_bg.x=540;
            rival_power_bg.y=40;
            rival_power_bg.backgroundColor='yellow';
        
            var rival_power_frame=new Sprite(206,16);
            rival_power_frame.x=537;
            rival_power_frame.y=37;
            rival_power_frame.backgroundColor='green';
        
            //scene.backgroundColor = "green";
            scene.addChild(background);
            //scene.addChild(label);
            scene.addChild(hero_frame);
            scene.addChild(hero_health_bg);
            scene.addChild(hero_health);
            scene.addChild(rival_frame);
            scene.addChild(rival_health_bg);
            scene.addChild(rival_health);
            scene.addChild(hero_power_frame);
            scene.addChild(hero_power_bg);
            scene.addChild(hero_power);
            scene.addChild(rival_power_frame);
            scene.addChild(rival_power_bg);
            scene.addChild(rival_power);
           
            



            // Make a spaceship.
            var sumarai= new Sprite(292,204);
            sumarai.image = game.assets['cutright.jpg'];
            sumarai.x = (game.width - sumarai.width) / 4;
            sumarai.y = game.height - sumarai.height;
            //spaceship.speed = 5;    // pixels per frame under power.
           // spaceship.gravity = 2;  // pixels per frame drop w/o power.
            var new_sumarai=new Sprite(244,165);
            new_sumarai.image=game.assets['bluerunleft.jpg'];
            new_sumarai.x=(game.width-new_sumarai.width)*3/4;
            new_sumarai.y=game.height-new_sumarai.height-20;

            scene.addChild(sumarai);
            scene.addChild(new_sumarai);

           // sumarai.frame=[0,0,0,1,1];
            // Blast off.
        function in_range_of_attack(sumarai,new_sumarai)
        {
            if((hero_direc=='right'&&rival_direc=='left'&&(sumarai.x+sumarai.width-80>=new_sumarai.x+110)&&(sumarai.x+80<=new_sumarai.x+new_sumarai.width-60))||
                (hero_direc=='left'&&rival_direc=='left'&&(sumarai.x+80<=new_sumarai.x+new_sumarai.width-60)&&(sumarai.x+sumarai.width-80>=new_sumarai.x+110))||
                (hero_direc=='right'&&rival_direc=='right'&&(sumarai.x+sumarai.width-80>=new_sumarai.x+60)&&(sumarai.x+80<=new_sumarai.x+new_sumarai.width-110))||
                (hero_direc=='left'&&rival_direc=='right'&&(sumarai.x+80<=new_sumarai.x+new_sumarai.width-110)&&(sumarai.x+sumarai.width-80>=new_sumarai.x-60)))
            {
                return true;
            }
            else return false;
        }
        function in_range_of_attack_rival(sumarai,new_sumarai)
        {
            if((rival_direc=='right'&&(new_sumarai.x+new_sumarai.width-66>sumarai.x+95)&&(new_sumarai.width+new_sumarai.x-66<sumarai.x+sumarai.width-95))||(rival_direc=='left'&&(new_sumarai.x+66<sumarai.x+sumarai.width-95)&&(new_sumarai.x+66>sumarai.x+95)))
            {
                return true;
            }
            else return false;
        }
         function on_key_down(e)
        {
            if(!hero_super&&!rival_super)
                if(e.keyCode=='74')
                {
                    //confirm('j down');
                    
                    hero_run=false;
                    hero_cut=true;
                    if(hero_direc=='left')
                    {
                        sumarai.image = game.assets['cutleft.jpg'];
                        sumarai.frame=[7,1,2,3,4,5,6,6];
                        //confirm('j');
                        cur_frame=8;
                    }
                    else
                    {
                        sumarai.image = game.assets['cutright.jpg'];
                        sumarai.frame=[7,1,2,3,4,5,6,6];
                        //confirm('j');
                        cur_frame=8;
                    }

                    //confirm('after press j cur_frame is '+cur_frame+'sumarai.frame='+sumarai.frame);

                    //confirm(sumarai.frame.length);
                    //sumarai.frame=0;
                }

               /* else if(e.keyCode=='65'&&e.keyCode=='68')
                {
                    confirm('shit');
                }*/
               else if(e.keyCode=='65')
                {
                    //sumarai.x-=7;
                    hero_run=true;
                    hero_direc='left';
                    sumarai.image=game.assets['run_.jpg'];

                    sumarai.frame=[0,0,1,1,2,2,3,3,4,4,5,5,6,6];
                    cur_frame=14;

                }
                else if(e.keyCode=='68')
                {
                    //sumarai.x+=7;
                    hero_run=true;
                    hero_direc='right';
                    sumarai.image=game.assets['run.jpg'];

                    sumarai.frame=[0,0,1,1,2,2,3,3,4,4,5,5,6,6];
                    cur_frame=14;

                }
                else if(e.keyCode=='75')
                {
                    if(hero_power.width>40)
                    {
                        hero_run=false;
                        hero_defend=false;
                        hero_cut=false;
                        hero_chop=true;
                        if(hero_direc=='right')
                        {
                            sumarai.image=game.assets['chopright.jpg'];
                            sumarai.frame=[1,2,3,4,5,5,6,7,7,8,9,9,10,11,12,13,14,15,16,17,17,18,19,19,20,20,21,21,0];
                        }
                        else if(hero_direc=='left')
                        {
                            sumarai.image=game.assets['chopleft.jpg'];
                            sumarai.frame=[2,1,0,5,5,4,3,8,7,7,6,11,10,9,14,13,12,17,17,16,15,20,20,19,19,18,21,21,0];
                        }
                        cur_frame=29;
                    }
                    
                }
                else if(e.keyCode=='83')
                {
                    hero_run=false;
                    hero_chop=false;
                    hero_cut=false;
                    hero_defend=true;
                    if(hero_direc=='left')
                        sumarai.image=game.assets['defendleft.jpg'];
                    //confirm('shit')
                    else if(hero_direc=='right')
                        sumarai.image=game.assets['defendright.jpg'];
                    sumarai.frame=[0];
                    cur_frame=30;
                }
                else if(e.keyCode=='104'||e.keyCode=='56')
                {
                    //confirm('chop')
                    if(rival_power.width>40)
                    {
                        rival_chop=true;
                        rival_defend=false;
                        rival_run=false;
                        if(rival_direc=='right')
                        {
                            new_sumarai.image=game.assets['bluechopright.jpg'];
                            new_sumarai.frame=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]
                            rival_frame=27;
                        }
                        else if(rival_direc=='left')
                        {
                            new_sumarai.image=game.assets['bluechopleft.jpg'];
                            new_sumarai.frame=[3,2,1,0,7,6,5,4,11,10,9,8,15,14,13,12,19,18,17,16,23,22,21,20,26,25,24];
                            rival_frame=27;
                        }
                    }
                    
                    //alert('9');
                }
                else if(e.keyCode=='103'||e.keyCode=='55')
                {
                    //confirm('0');
                    rival_cut=true;
                    rival_run=false;
                    if(rival_direc=='right')
                    {
                        new_sumarai.image=game.assets['bluecutright.jpg'];
                        new_sumarai.frame=[0,2,3,4,5,7,8,9];
                    }
                    else if(rival_direc=='left')
                    {
                        new_sumarai.image=game.assets['bluecutleft.jpg'];
                        new_sumarai.frame=[0,2,3,4,5,7,8,9];
                    }
                    rival_frame=8;
                }
                
                //////////////////////////////////////////////////////////super
                else if(e.keyCode=='85')
                {
                    if(hero_power.width==200)
                    {
                        //confirm(' ');
                        //confirm(rival_frame);
                        hero_super=true;
                        //if(rival_defend==false)
                        {
                            //rival_frame=0;
                            if(rival_direc=='left')
                            {
                                if(hero_direc=='right')
                                {
                                    if(sumarai.x+sumarai.width-80<new_sumarai.x+110)
                                    {
                                        
                                        sumarai.image=game.assets['run.jpg'];
                                        //sumarai.frame=[0,1,2,3,4,5,6];
                                        cur_frame=14;
                                        hero_super_run=true;
                                    }
                                    
                                }
                                else
                                {
                                    if(sumarai.x+80>new_sumarai.x+new_sumarai.width-80)
                                    {
                                        sumarai.image=game.assets['run_.jpg'];
                                        cur_frame=14;
                                        hero_super_run=true;
                                    }
                                }
                            }
                            else if(rival_direc=='right')
                            {
                                if(hero_direc=='right')
                                {
                                   if(sumarai.x+sumarai.width-80<=new_sumarai.x+40) 
                                    {
                                        sumarai.image=game.assets['run.jpg'];
                                        cur_frame=14;
                                        hero_super_run=true;
                                    }
                                }
                                else
                                {
                                    if(sumarai.x+80>new_sumarai.x+new_sumarai.width-110)
                                    {
                                        //confirm(' ');
                                        sumarai.image=game.assets['run_.jpg'];
                                        cur_frame=14;
                                        hero_super_run=true;
                                    }
                                }
                            }
                        }
                    }
                }
            ////////////////////////////////////////////////////rival super
                else if(e.keyCode=='105'||e.keyCode=='57')
                {
                    if(rival_power.width==200)
                    {
                        rival_super=true;
                        if(rival_direc=='right')
                        {
                            
                            new_sumarai.image=game.assets['superbluerushright.jpg'];
                            
                        }
                        else 
                        {
                            new_sumarai.image=game.assets['superbluerushleft.jpg'];
                        }
                        rival_frame=[0];
                        rival_frame=20;
                        if((rival_direc=='left'&&new_sumarai.x>sumarai.x)||(rival_direc=='right'&&new_sumarai.x<sumarai.x))
                        {
                            rival_super_run=true;
                        }
                        
                    }
                }
               // confirm('keydown');
            }
           /* function on_key_up(e)
            {
                if(e.keyCode=='74'){
                    //confirm('j up');
                    sumarai.frame=[0,0,0,1,1];
                }


            }*/
           // window.addEventListener('keyup',on_key_up,false);
            window.addEventListener('keydown',on_key_down,false);

            sumarai.addEventListener(Event.ENTER_FRAME, function () {
                    
                    if(hero_health.width==0)
                    {
                        game.pushScene(rival_win_scene());
                    }
                    else if(rival_health.width==0)
                    {
                        game.pushScene(hero_win_scene());
                    }
               
                    if(hero_chop&&(rival_chop||rival_defend)&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        game.strike.play();
                    }
                    else if(rival_chop&&(hero_chop||hero_defend)&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        game.strike.play();
                    }
                    else if(hero_cut&&rival_cut&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        game.strike.play();
                    }
                    else if(hero_defend&&rival_cut&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        game.strike.play();
                    }
                    else if(rival_defend&&hero_cut&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        game.strike.play();
                        
                    }
                    else if(hero_cut&&rival_chop)
                    {
                        //confirm(' ');
                        rival_health.width-=0.5;
                        
                        hero_power.width+=2;
                        //if(hero_power.width>200)
                        
                        hero_health.width-=2;
                        game.strike.play();
                        game.chopped.play();
                    }
                    else if(hero_cut&&!rival_cut&&!rival_defend&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        rival_health.width-=1;
                        
                        hero_power.width+=4;
                        
                        game.chopped.play();
                    }
                    else if(hero_chop&&!rival_cut&&!rival_defend&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        rival_health.width-=2;
                        
                        hero_power.width-=4;
                        //else hero_power.width=0;
                        game.chopped.play();
                    }
                    else if(rival_chop&&!hero_chop&&!hero_defend&&!hero_super&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        hero_health.width-=2;
                        
                        rival_power.width-=4;
                        
                        game.chopped.play();
                    }
                    else if(rival_cut&&!hero_chop&&!hero_defend&&!hero_super&&in_range_of_attack(sumarai,new_sumarai))
                    {
                        hero_health.width-=1;
                        
                        rival_power.width+=4;
                        game.chopped.play();
                    }
                    //else if(hero_cut&&)
                    else if(hero_super_run==true)
                    {
                        //confirm(7-cur_frame);
                       // confirm('run');
                       // confirm(rival_frame);
                        sumarai.frame=[13-cur_frame];
                        
                        
                        
                        if(hero_direc=='right'&&rival_direc=='left')
                        {
                            sumarai.x+=30;
                            if(sumarai.x+sumarai.width-80>=new_sumarai.x+110)
                            {
                                 hero_super_run=false;
                                 cur_frame=0;
                            }
                           
                           
                           
                        }
                        else if(hero_direc=='left'&&rival_direc=='left')
                        {
                            sumarai.x-=30;
                            if(sumarai.x+100<=new_sumarai.x+new_sumarai.width-60)//
                            {
                                hero_super_run=false;
                                cur_frame=0;
                            }
                        }
                        else if(hero_direc=='right'&&rival_direc=='right')
                        {
                            sumarai.x+=30;
                            if(sumarai.x+sumarai.width-80>=new_sumarai.x+60)//
                            {
                                hero_super_run=false;
                                cur_frame=0;
                            }
                                
                                
                        }
                        else if(hero_direc=='left'&&rival_direc=='right')
                        {
                           // confirm(' ')
                            sumarai.x-=30;
                            if(sumarai.x+80<=new_sumarai.x+new_sumarai.width-110)//
                                
                            {
                                hero_super_run=false;
                                cur_frame=0;
                            }
                        }
                        /*if(cur_frame==0)
                        {
                            hero_chop=true;
                            if(hero_direc=='right')
                            {
                                sumarai.image=game.assets['chopright.jpg'];
                                sumarai.frame=[1,2,3,4,5,5,6,7,7,8,9,9,10,11,12,13,14,15,16,17,17,18,19,19,20,20,21,21,0];
                            }
                            else if(hero_direc=='left')
                            {
                                sumarai.image=game.assets['chopleft.jpg'];
                                sumarai.frame=[2,1,0,5,5,4,3,8,7,7,6,11,10,9,14,13,12,17,17,16,15,20,20,19,19,18,21,21,0];
                            }
                            cur_frame=29;
                        }*/
                    }
                
                //super hit
                    else if(hero_super_run==false&&hero_super==true)//&&hero_super_state=='d') 
                    {   
                        /*if((hero_direc=='right'&&rival_direc=='left'&&(sumarai.x+sumarai.width-80>=new_sumarai.x+110)&&)||
                            (hero_direc=='left'&&rival_direc=='left'&&(sumarai.x+100<=new_sumarai.x+new_sumarai.width-60))||
                            (hero_direc=='right'&&rival_direc=='right'&&(sumarai.x+sumarai.width-80>=new_sumarai.x+60))||
                            (hero_direc=='left'&&rival_direc=='right'&&(sumarai.x+80<=new_sumarai.x+new_sumarai.width-110)))*/
                        
                        if(in_range_of_attack(sumarai,new_sumarai)&&!rival_defend)
                        {
                            //rival_frame=0;
                            rival_run=false;
                            rival_chop=false;
                            rival_cut=false;
                            rival_defend=false;
                            if(rival_direc=='left')
                            {
                                new_sumarai.image=game.assets['bluerunleft.jpg'];
                                new_sumarai.frame=[0];
                            }
                            else
                            {
                                new_sumarai.image=game.assets['bluerunright.jpg'];
                                new_sumarai.frame=[7];
                            }
                            rival_health.width-=1.5;
                            if(hero_super_state=='a')
                            {
                                if(cur_frame<47)
                                    game.chopped.play();
                            }
                            else if(hero_super_state=='b')
                            {
                                if(cur_frame>10)
                                    game.chopped.play();
                            }
                            
                         
                    
                            if(rival_direc=='left')
                                new_sumarai.image=game.assets['bluerunleft.jpg'];
                            else if(rival_direc=='right')
                                new_sumarai.image=game.assets['bluerunright.jpg'];
                            new_sumarai.frame=[0];
                        
                    
                        }
                        else if(in_range_of_attack(sumarai,new_sumarai)&&rival_defend)
                        {
                            
                            if(hero_super_state=='a')
                            {
                                if(cur_frame<47)
                                    game.strike.play();
                            }
                            else if(hero_super_state=='b')
                            {
                                game.strike.play();
                            }
                            
                        }
                        
                        if(hero_super_state=='c')
                        {
                            if(cur_frame==0)
                            {
                                cur_frame=70;
                                hero_super_state='a';
                                if(hero_direc=='right')
                                    sumarai.image=game.assets['hero_super_a.jpg'];
                                else 
                                    sumarai.image=game.assets['hero_super_a_.jpg'];
                            }
                            
                           
                        }
                        else if(hero_super_state=='a')
                        {
                            if(cur_frame>0)
                            {
                                sumarai.frame=[70-cur_frame];
                                if(hero_power.width>=2)
                                    hero_power.width-=2;
                                else
                                    hero_power.width=0;
                            }
                            else if(cur_frame==0)
                            {
                                cur_frame=66;
                                hero_super_state='b';
                                if(hero_direc=='right')
                                    sumarai.image=game.assets['hero_super_b.jpg'];
                                else
                                    sumarai.image=game.assets['hero_super_b_.jpg'];
                            }
                            
                        }
                        else if(hero_super_state=='b')
                        {
                            if(cur_frame>0)
                            {
                                sumarai.frame=[66-cur_frame];
                                if(hero_power.width>=2)
                                    hero_power.width-=2;
                                else
                                    hero_power.width=0;
                            }
                            else if(cur_frame==0)
                            {
                                hero_super=false;
                                hero_super_state='c';
                            }
                        }
                        
                        //sumarai.image=game.assets['hero_super_b.jpg'];
                        
                        
                    }
                    if(hero_power.width<0)
                        hero_power.width=0;
                    else if(hero_power.width>200)
                        hero_power.width=200;
                    if(hero_health.width<0)
                        hero_health.width=0;
                    
                    if(rival_power.width<0)
                        rival_power.width=0;
                    else if(rival_power.width>200)
                        rival_power.width=200;
                    if(rival_health.width<0)
                        rival_health.width=0;
                    
                //}

                if(cur_frame>0)
                {
                    //confirm('fps='+cur_frame);
                    //confirm(cur_frame);
                    if(!rival_super)
                        cur_frame--;
                    
                   // if()
                    if(hero_direc=='left'&&hero_run&&sumarai.x+80>0)
                    {
                        sumarai.x-=10;
                        game.run.play();
                    }
                    else if(hero_direc=='right'&&hero_run&&sumarai.x+sumarai.width-80<800)
                    {
                        sumarai.x+=10;
                        game.run.play();
                    }

                }

                if(cur_frame===0)
                {
                    hero_chop=false;
                    hero_cut=false;
                    hero_run=false;
                    hero_defend=false;
                    if(hero_direc=='left')
                    {
                        sumarai.image=game.assets['cutleft.jpg'];
                        sumarai.frame=[0];
                    }
                    else if(hero_direc=='right')
                    {
                        sumarai.image=game.assets['cutright.jpg'];
                        sumarai.frame=[0];
                    }
                    //sumarai.image=game.assets['cut.jpg'];
                    //sumarai.frame=[7];

                }


            });



            new_sumarai.addEventListener(Event.ENTER_FRAME,function(){
                /*if(hero_super)
                    {
                        confirm(rival_frame);
                        
                    }*/
                if(rival_super_run==true)
                {
                    isrivalrun=true;
                    if(!in_range_of_attack(sumarai,new_sumarai))
                    {
                        if(new_sumarai.x<sumarai.x)
                        {
                            new_sumarai.x+=60;
                        }
                        else
                        {
                            new_sumarai.x-=60;
                        }
                    }
                    else
                    {
                        rival_super_run=false;
                        if(rival_direc=='left')
                        {
                            new_sumarai.image=game.assets['superblueleft.jpg'];
                        }
                        else
                        {
                            new_sumarai.image=game.assets['superblueright.jpg'];
                        }
                        new_sumarai.y+=10;
                        rival_frame=24;
                        
                    }
                }
                else if(rival_super_run==false&&rival_super)
                {
                    rival_power.width-=2;
                    if(in_range_of_attack(sumarai,new_sumarai)&&!hero_defend)
                    {
                        //confirm(' ')
                        hero_health.width-=1.3;
                        
                        game.chopped.play();
                        if(hero_direc=='left')
                        {
                            sumarai.image=game.assets['cutleft.jpg'];
                        }
                        else
                        {
                            sumarai.image=game.assets['cutright.jpg'];
                        }
                        sumarai.frame=[0];
                    }
                    else if(in_range_of_attack(sumarai,new_sumarai)&&hero_defend)
                    {

                        game.strike.play();

                    }
                    if(rival_frame>0)
                        new_sumarai.frame=[24-rival_frame];
                    else if(rival_frame==0)
                    {
                        
                        rival_super_state++;
                        if(rival_super_state==6)
                        {
                             rival_super=false;
                             rival_super_state=0;
                             if(isrivalrun)
                             {
                                  new_sumarai.y-=10;
                                  isrivalrun=false;
                             }
                            
                        }
                        else
                        {
                            if(rival_direc=='left')
                            {
                                new_sumarai.image=game.assets['superblueleft.jpg'];
                            }
                            else
                            {
                                new_sumarai.image=game.assets['superblueright.jpg'];
                            }
                            rival_frame=24;
                            //new_sumarai.y+=10;
                        }
                       
                    }
                }
                if(rival_frame>0)
                {
                    if(!hero_super)
                        
                        rival_frame--;
                    
                    
                    if(rival_direc=='left'&&rival_run&&new_sumarai.x+110>0)
                    {
                        new_sumarai.x-=17;
                    }
                    else if(rival_direc=='right'&&rival_run&&new_sumarai.x+new_sumarai.width-110<800)
                    {
                        new_sumarai.x+=17;
                    }

                }
                if(rival_frame==0)
                {
                    rival_run=false;
                    rival_chop=false;
                    rival_cut=false;
                    rival_defend=false;
                    if(rival_direc=='left')
                    {
                        new_sumarai.image=game.assets['bluerunleft.jpg'];
                        new_sumarai.frame=[0];
                    }
                    else
                    {
                        new_sumarai.image=game.assets['bluerunright.jpg'];
                        new_sumarai.frame=[7];
                    }

                }
                if (game.input.left && !game.input.down&&!hero_super&&!rival_super) {

                    rival_direc='left';
                    rival_chop=false;
                    rival_cut=false;
                    rival_run=true;
                    new_sumarai.image=game.assets['bluerunleft.jpg'];
                    new_sumarai.frame=[7,7,7,5,4,4,4,1];
                    game.bluerun.play();
                    rival_frame=8;

                    // spaceship needs plumage!
                  //sumarai.frame=[1,1,2,2,3,3,4,4,5,5,6,6,7,7];
                }
                else if(game.input.right&&!hero_super&&!rival_super)
                {
                    rival_run=true;
                    rival_cut=false;
                    rival_chop=false;
                    rival_direc='right';
                    new_sumarai.image=game.assets['bluerunright.jpg'];
                    new_sumarai.frame=[0,0,0,1,3,3,3,4];
                    game.bluerun.play();
                    rival_frame=8;
                }
                else if(game.input.down&&!hero_super&&!rival_super)
                {
                    rival_defend=true;
                    rival_chop=false;
                    rival_run=false;
                    if(rival_direc=='left')
                    {
                        new_sumarai.image=game.assets['bluedefendleft.jpg'];
                        new_sumarai.frame=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        rival_frame=14;
                    }
                    else
                    {
                        new_sumarai.image=game.assets['bluedefendright.jpg'];
                        new_sumarai.frame=[0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                        rival_frame=14;
                    }
                    //rival_frame=1;
                }

            });
       
        return scene;
    }
    
    
    function hero_win_scene()
    {
        var herowin=new Scene();
        var bg=new Sprite(800,300);
        bg.image=game.assets['herowin.jpg'];
        herowin.addChild(bg);
        return herowin;
    }
    
    function rival_win_scene()
    {
        var rivalwin=new Scene();
        var bg=new Sprite(800,300);
        bg.image=game.assets['rivalwin.jpg'];
        rivalwin.addChild(bg);
        return rivalwin;
    }
    // Start the game.
    
}
 
 
 
 
 
 
 
 
 

