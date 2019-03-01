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