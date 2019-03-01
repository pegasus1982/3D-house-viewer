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
    
    camera = new BABYLON.ArcRotateCamera("Camera", 4, 1, 8000, new BABYLON.Vector3(0,30,0), scene);
    camera.attachControl(canvas, false);
    camera.upperBetaLimit = 1.57;
    camera.lowerBetaLimit = 0.4;
    camera.wheelPrecision = 0.1;
    
    // camera.upperRadiusLimit = 1200;
    // camera.lowerRadiusLimit = 200;

    light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(4000, 6000, 5000), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-4000, 7000, -6000), scene);

    //load babylon model
    var assetsManager = new BABYLON.AssetsManager(scene);

    //load cilindro 1
    var meshTask1 = assetsManager.addMeshTask("model task", "", "assets/models/house/", "house.babylon");
    meshTask1.onSuccess = function (task) {
        // for(var i in task.loadedMeshes){
        //     task.loadedMeshes[i].position.z += 400;
        // }
        loadedModel.push(task.loadedMeshes);
    }

    meshTask1.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

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