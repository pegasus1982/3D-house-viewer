var canvas = document.getElementById('renderCanvas');
const ANIM_DURATION = 15;

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

var scene,
    camera,
    light1,
    light2,
    light3,
    sphere,
    ground;

var advancedTexture;
var label_01,
    label_02,
    label_03,
    label_04;

var loadedModel = [];
let n_HighlightTimeCount = 0;
var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.ArcRotateCamera("Camera", 4, 1, 1000, new BABYLON.Vector3(0,30,0), scene);
    camera.attachControl(canvas, false);
    camera.upperBetaLimit = 1.57;
    camera.lowerBetaLimit = 0.4;
    
    camera.upperRadiusLimit = 1200;
    camera.lowerRadiusLimit = 200;

    console.log('camera',camera)
    
    light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(400, 600, 500), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-400, 700, -600), scene);

    //load babylon model
    var assetsManager = new BABYLON.AssetsManager(scene);

    //load cilindro 1
    var meshTask1 = assetsManager.addMeshTask("model task", "", "assets/models/babylon/", "cilindro-01.babylon");
    meshTask1.onSuccess = function (task) {
        for(var i in task.loadedMeshes){
            task.loadedMeshes[i].position.z += 400;
        }
        loadedModel.push(task.loadedMeshes);
    }

    meshTask1.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    //load cilindro 2
    var meshTask2 = assetsManager.addMeshTask("model task", "", "assets/models/babylon/", "cilindro-02.babylon");
    meshTask2.onSuccess = function (task) {
        for(var i in task.loadedMeshes){
            task.loadedMeshes[i].position.z -= 400;
        }
        loadedModel.push(task.loadedMeshes);
    }

    meshTask2.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    //load cilindro 3
    var meshTask3 = assetsManager.addMeshTask("model task", "", "assets/models/babylon/", "cilindro-03.babylon");
    meshTask3.onSuccess = function (task) {
        for(var i in task.loadedMeshes){
            task.loadedMeshes[i].position.z -= 133;
        }
        loadedModel.push(task.loadedMeshes);
    }

    meshTask3.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    //load cilindro 4
    var meshTask4 = assetsManager.addMeshTask("model task", "", "assets/models/babylon/", "cilindro-04.babylon");
    meshTask4.onSuccess = function (task) {
        for(var i in task.loadedMeshes){
            task.loadedMeshes[i].position.z += 133;
        }
        loadedModel.push(task.loadedMeshes);
    }

    meshTask4.onError = function(task,message,exception){
        console.log(task,message,exception);
    }


    advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("ui1");

    label_01 = new BABYLON.GUI.Rectangle("label_01");
    label_01.background = "black"
    label_01.alpha = 0.8;
    label_01.width = "200px";
    label_01.height = "100px";
    label_01.cornerRadius = 10;
    label_01.thickness = 1;
    label_01.linkOffsetY = 90;
    label_01.top = "15%";
    label_01.left = "35%"
    label_01.zIndex = 5;
    label_01.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_01); 
    label_01.isVisible = false;

    label_02 = new BABYLON.GUI.Rectangle("label_02");
    label_02.background = "black"
    label_02.alpha = 0.8;
    label_02.width = "200px";
    label_02.height = "100px";
    label_02.cornerRadius = 10;
    label_02.thickness = 1;
    label_02.linkOffsetY = 90;
    label_02.top = "30%";
    label_02.left = "35%"
    label_02.zIndex = 5;
    label_02.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_02);
    label_02.isVisible = false;

    label_03 = new BABYLON.GUI.Rectangle("label_03");
    label_03.background = "black"
    label_03.alpha = 0.8;
    label_03.width = "200px";
    label_03.height = "100px";
    label_03.cornerRadius = 10;
    label_03.thickness = 1;
    label_03.linkOffsetY = 90;
    label_03.top = "45%";
    label_03.left = "35%"
    label_03.zIndex = 5;
    label_03.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_03);
    label_03.isVisible = false;

    label_04 = new BABYLON.GUI.Rectangle("label_04");
    label_04.background = "black"
    label_04.alpha = 0.8;
    label_04.width = "200px";
    label_04.height = "100px";
    label_04.cornerRadius = 10;
    label_04.thickness = 1;
    label_04.linkOffsetY = 90;
    label_04.top = "60%";
    label_04.left = "35%"
    label_04.zIndex = 5;
    label_04.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;    
    advancedTexture.addControl(label_04);
    label_04.isVisible = false;

    assetsManager.load();

    return scene;
}

// call the createScene function
var scene = createScene();

// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});

function addSectionAnimation(model,offset){
    var animBox = new BABYLON.Animation("anim-"+model.name,"position.y",30,BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    var keys = [];
    keys.push({
        frame : 0,
        value : model.position.y,
    });
    keys.push({
        frame : ANIM_DURATION,
        value : model.position.y + offset,
    })
    animBox.setKeys(keys);
    model.animations.push(animBox);
    scene.beginAnimation(model, 0, ANIM_DURATION, false);
}

function highlightTimer(){
    n_HighlightTimeCount++;
    n_HighlightTimeCount %= 100;
    setTimeout(() => {
        highlightTimer();
    }, 500);
}

highlightTimer();

function winkingTimerCallback(hl){
    hl.blurHorizontalSize   = n_HighlightTimeCount % 2;
    hl.blurVerticalSize     = n_HighlightTimeCount % 2;
    setTimeout(() => {
        winkingTimerCallback(hl);
    }, 500);
}
function addIlluminateAnimation(model, index){
    var hl = new BABYLON.HighlightLayer("hl", scene);
    hl.blurHorizontalSize   = 2;
    hl.blurVerticalSize     = 2;
    hl.addMesh(model, BABYLON.Color3.Red());

    winkingTimerCallback(hl);

    if(index == 0)
    {
        if(model.name.includes('tube-') && !model.name.includes('tube-sticker')){
            label_01.isVisible = true;
            var line = new BABYLON.GUI.Line();
            line.alpha = 0.8;
            line.lineWidth = 3;
            line.dash = [5, 10];
            advancedTexture.addControl(line); 
            line.linkWithMesh(model);
            line.connectedControl = label_01;
    
            var text1 = new BABYLON.GUI.TextBlock();
            text1.text =    "Nombre : xxxx\n"+
                            "Tiempo  : xxxx\n"+
                            "Estado   : ok   ";
            text1.color = "white";
            label_01.addControl(text1);
        }
    }
    else if(index == 1){
        label_02.isVisible = true;
        var line = new BABYLON.GUI.Line();
        line.alpha = 0.8;
        line.lineWidth = 3;
        line.dash = [5, 10];
        advancedTexture.addControl(line); 
        line.linkWithMesh(model);
        line.connectedControl = label_02;

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text =    "Nombre : xxxx\n"+
                        "Tiempo  : xxxx\n"+
                        "Estado   : ok   ";
        text1.color = "white";
        label_02.addControl(text1);
    }
    else if(index == 2){
        label_03.isVisible = true;
        var line = new BABYLON.GUI.Line();
        line.alpha = 0.8;
        line.lineWidth = 3;
        line.dash = [5, 10];
        advancedTexture.addControl(line); 
        line.linkWithMesh(model);
        line.connectedControl = label_03;

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text =    "Nombre : xxxx\n"+
                        "Tiempo  : xxxx\n"+
                        "Estado   : ok   ";
        text1.color = "white";
        label_03.addControl(text1);
    }
    else if(index == 3){
        label_04.isVisible = true;
        var line = new BABYLON.GUI.Line();
        line.alpha = 0.8;
        line.lineWidth = 3;
        line.dash = [5, 10];
        advancedTexture.addControl(line); 
        line.linkWithMesh(model);
        line.connectedControl = label_04;

        var text1 = new BABYLON.GUI.TextBlock();
        text1.text =    "Nombre : xxxx\n"+
                        "Tiempo  : xxxx\n"+
                        "Estado   : ok   ";
        text1.color = "white";
        label_04.addControl(text1);
    }
}

function checkCilindro_01(num){
    if(num <= 0 || num > 20) return;

    for(var i in loadedModel[0]){
        //check num sticker
        if(loadedModel[0][i].name.includes('num-'))
        {
            var tubeNum = parseInt(loadedModel[0][i].name.substring(4,6));
            if(tubeNum == ((num>10)?(num-10):num))
                addSectionAnimation(loadedModel[0][i],30)
        }
        if(num > 10)
        {
            //check section
            if(loadedModel[0][i].name == 'section-01') addSectionAnimation(loadedModel[0][i],60);
            if(loadedModel[0][i].name == 'section-02') addSectionAnimation(loadedModel[0][i],32);

            if(loadedModel[0][i].name.includes('tube-') && !loadedModel[0][i].name.includes('tube-sticker')){
                var tubeNum = parseInt(loadedModel[0][i].name.substring(5,7));
                if(tubeNum < 12) addSectionAnimation(loadedModel[0][i],60);
                else addSectionAnimation(loadedModel[0][i],32);
            }

            if(loadedModel[0][i].name.includes('tube-sticker-')){
                var stickerNum = parseInt(loadedModel[0][i].name.substring(14,17));
                if(stickerNum < 12) addSectionAnimation(loadedModel[0][i],60);
                else addSectionAnimation(loadedModel[0][i],32);
            }

            //check tube
            if(loadedModel[0][i].name.includes('tube-') && !loadedModel[0][i].name.includes('tube-sticker')){
                var tubeNum = parseInt(loadedModel[0][i].name.substring(5,7));
                if(tubeNum == (num + 1)){
                    let tmpModel = loadedModel[0][i];
                    setTimeout(() => {
                        addIlluminateAnimation(tmpModel,0);
                    }, 1000);
                }
            }
            if(loadedModel[0][i].name.includes('tube-sticker-')){
                var stickerNum = parseInt(loadedModel[0][i].name.substring(14,17));
                if(stickerNum == (num + 1))
                {
                    let tmpModel = loadedModel[0][i];
                    setTimeout(() => {
                        addIlluminateAnimation(tmpModel,0);
                    }, 1000);
                }
            }
        }
        else{
            //check tube
            if(loadedModel[0][i].name.includes('tube-') && !loadedModel[0][i].name.includes('tube-sticker')){
                var tubeNum = parseInt(loadedModel[0][i].name.substring(5,7));
                if(tubeNum == num) addIlluminateAnimation(loadedModel[0][i],0);
            }
            if(loadedModel[0][i].name.includes('tube-sticker-')){
                var stickerNum = parseInt(loadedModel[0][i].name.substring(14,17));
                if(stickerNum == num) addIlluminateAnimation(loadedModel[0][i],0);
            }
        }
    }
}

function checkCilindro_02(num){
    if(num <= 0 || num > 12) return;

    for(var i in loadedModel[1]){
        if(num > 6)
        {
            //check section
            if(loadedModel[1][i].name == 'section-001') addSectionAnimation(loadedModel[1][i],60);
            if(loadedModel[1][i].name == 'section-002') addSectionAnimation(loadedModel[1][i],26);

            if(loadedModel[1][i].name.includes('sticker-')){
                var tubeNum = parseInt(loadedModel[1][i].name.substring(8,11));
                if(tubeNum <= 6) addSectionAnimation(loadedModel[1][i],60);
                else addSectionAnimation(loadedModel[1][i],26);

                if(tubeNum == num){
                    let tmpModel = loadedModel[1][i];
                    setTimeout(() => {
                        addIlluminateAnimation(tmpModel,1);
                    }, 1000);
                }
            }
        }
        else{
            if(loadedModel[1][i].name.includes('sticker-')){
                var tubeNum = parseInt(loadedModel[1][i].name.substring(8,11));
                if(tubeNum == num){
                    let tmpModel = loadedModel[1][i];
                    addIlluminateAnimation(tmpModel,1);
                }
            }
        }
    }
}

function checkCilindro_03(num){
    if(num <= 0 || num > 20) return;
    console.log('num ',num)
    for(var i in loadedModel[2]){
        if(num <= 4){
            if(loadedModel[2][i].name.includes('Tube-')){
                var tubeNum = parseInt(loadedModel[2][i].name.substring(5,8));
                if(tubeNum == num){
                    let tmpModel = loadedModel[2][i];
                    addIlluminateAnimation(tmpModel,2);
                }
            }
        }
        else{
            if(num > 4 && num <= 8){
                if(loadedModel[2][i].name == 'section-001') addSectionAnimation(loadedModel[2][i],120);
                if(loadedModel[2][i].name == 'section-002') addSectionAnimation(loadedModel[2][i],29);
                if(loadedModel[2][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[2][i].name.substring(5,8));
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[2][i],120);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[2][i],29);
                }
            }
            else if(num > 8 && num <= 12){
                if(loadedModel[2][i].name == 'section-001') addSectionAnimation(loadedModel[2][i],160);
                if(loadedModel[2][i].name == 'section-002') addSectionAnimation(loadedModel[2][i],140);
                if(loadedModel[2][i].name == 'section-003') addSectionAnimation(loadedModel[2][i],51);
                if(loadedModel[2][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[2][i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[2][i],160);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[2][i],140);

                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[2][i],51);
                }
            }
            else if(num > 12 && num <= 16){
                if(loadedModel[2][i].name == 'section-001') addSectionAnimation(loadedModel[2][i],210);
                if(loadedModel[2][i].name == 'section-002') addSectionAnimation(loadedModel[2][i],190);
                if(loadedModel[2][i].name == 'section-003') addSectionAnimation(loadedModel[2][i],170);
                if(loadedModel[2][i].name == 'section-004') addSectionAnimation(loadedModel[2][i],75);
                if(loadedModel[2][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[2][i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[2][i],210);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[2][i],190);
                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[2][i],170);

                    else if(tubeNum > 12 && tubeNum <= 16) addSectionAnimation(loadedModel[2][i],75);
                }
            }
            else if(num > 16 && num <= 20){
                if(loadedModel[2][i].name == 'section-001') addSectionAnimation(loadedModel[2][i],240);
                if(loadedModel[2][i].name == 'section-002') addSectionAnimation(loadedModel[2][i],220);
                if(loadedModel[2][i].name == 'section-003') addSectionAnimation(loadedModel[2][i],200);
                if(loadedModel[2][i].name == 'section-004') addSectionAnimation(loadedModel[2][i],180);
                if(loadedModel[2][i].name == 'section-005') addSectionAnimation(loadedModel[2][i],100);
                if(loadedModel[2][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[2][i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[2][i],240);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[2][i],220);
                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[2][i],200);
                    else if(tubeNum > 12 && tubeNum <= 16) addSectionAnimation(loadedModel[2][i],180);

                    else if(tubeNum > 16 && tubeNum <= 20) addSectionAnimation(loadedModel[2][i],100);
                }
            }
            if(loadedModel[2][i].name.includes('Tube-')){
                var tubeNum = parseInt(loadedModel[2][i].name.substring(5,8));
                if(tubeNum == num){
                    var tmpModel = loadedModel[2][i];
                    setTimeout(() => {
                        addIlluminateAnimation(tmpModel,2);
                    }, 1000);
                }
            }
        }
    }
}

function checkCilindro_04(num){
    if(num <= 0 || num > 20) return;
    console.log('num ',num)
    for(var i in loadedModel[3]){
        if(num <= 4){
            if(loadedModel[3][i].name.includes('Tube-')){
                var tubeNum = parseInt(loadedModel[3][i].name.substring(5,8));
                if(tubeNum == num){
                    let tmpModel = loadedModel[3][i];
                    addIlluminateAnimation(tmpModel,3);
                }
            }
        }
        else{
            if(num > 4 && num <= 8){
                if(loadedModel[3][i].name == 'section-001') addSectionAnimation(loadedModel[3][i],120);
                if(loadedModel[3][i].name == 'section-002') addSectionAnimation(loadedModel[3][i],29);
                if(loadedModel[3][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[3][i].name.substring(5,8));
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[3][i],120);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[3][i],29);
                }
            }
            else if(num > 8 && num <= 12){
                if(loadedModel[3][i].name == 'section-001') addSectionAnimation(loadedModel[3][i],160);
                if(loadedModel[3][i].name == 'section-002') addSectionAnimation(loadedModel[3][i],140);
                if(loadedModel[3][i].name == 'section-003') addSectionAnimation(loadedModel[3][i],51);
                if(loadedModel[3][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[3][i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[3][i],160);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[3][i],140);

                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[3][i],51);
                }
            }
            else if(num > 12 && num <= 16){
                if(loadedModel[3][i].name == 'section-001') addSectionAnimation(loadedModel[3][i],210);
                if(loadedModel[3][i].name == 'section-002') addSectionAnimation(loadedModel[3][i],190);
                if(loadedModel[3][i].name == 'section-003') addSectionAnimation(loadedModel[3][i],170);
                if(loadedModel[3][i].name == 'section-004') addSectionAnimation(loadedModel[3][i],75);
                if(loadedModel[3][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[3][i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[3][i],210);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[3][i],190);
                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[3][i],170);

                    else if(tubeNum > 12 && tubeNum <= 16) addSectionAnimation(loadedModel[3][i],75);
                }
            }
            else if(num > 16 && num <= 20){
                if(loadedModel[3][i].name == 'section-001') addSectionAnimation(loadedModel[3][i],240);
                if(loadedModel[3][i].name == 'section-002') addSectionAnimation(loadedModel[3][i],220);
                if(loadedModel[3][i].name == 'section-003') addSectionAnimation(loadedModel[3][i],200);
                if(loadedModel[3][i].name == 'section-004') addSectionAnimation(loadedModel[3][i],180);
                if(loadedModel[3][i].name == 'section-005') addSectionAnimation(loadedModel[3][i],100);
                if(loadedModel[3][i].name.includes('Tube-')){
                    var tubeNum = parseInt(loadedModel[3][i].name.substring(5,8));
                    
                    if(tubeNum <= 4) addSectionAnimation(loadedModel[3][i],240);
                    else if(tubeNum > 4 && tubeNum <= 8) addSectionAnimation(loadedModel[3][i],220);
                    else if(tubeNum > 8 && tubeNum <= 12) addSectionAnimation(loadedModel[3][i],200);
                    else if(tubeNum > 12 && tubeNum <= 16) addSectionAnimation(loadedModel[3][i],180);

                    else if(tubeNum > 16 && tubeNum <= 20) addSectionAnimation(loadedModel[3][i],100);
                }
            }
            if(loadedModel[3][i].name.includes('Tube-')){
                var tubeNum = parseInt(loadedModel[3][i].name.substring(5,8));
                if(tubeNum == num){
                    var tmpModel = loadedModel[3][i];
                    setTimeout(() => {
                        addIlluminateAnimation(tmpModel,3);
                    }, 1000);
                }
            }
        }
    }
}

document.getElementById('btn-remove').addEventListener('click',function(){
    document.getElementById('input-panel').style.display = 'none';
    document.getElementById('reset').style.display = 'block';
    var num = parseInt(document.getElementById('input-num').value);

    scene.registerBeforeRender(function() {
        camera.alpha += 0.005;
    });

    checkCilindro_01(num);
    checkCilindro_02(num);
    checkCilindro_03(num);
    checkCilindro_04(num);
})

document.getElementById('btn-reset').addEventListener('click',function(){
    location.reload();
})