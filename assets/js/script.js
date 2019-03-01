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
    
    camera = new BABYLON.ArcRotateCamera("Camera", 5.8, 1.45, 2000, new BABYLON.Vector3(0,100,0), scene);
    camera.attachControl(canvas, false);
    camera.upperBetaLimit = 1.57;
    // camera.lowerBetaLimit = 0.4;
    camera.wheelPrecision = 0.1;
    
    camera.upperRadiusLimit = 3000;
    camera.lowerRadiusLimit = 500;

    light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(4000, 6000, 5000), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-4000, 7000, -6000), scene);

    var assetsManager = new BABYLON.AssetsManager(scene);

    // load house model
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

    //generate ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "assets/texture/heightMap-01.png", 6000, 6000, 30, 0, 500, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/texture/grass.jpg", scene);

    groundMaterial.diffuseTexture.uScale = 20;
    groundMaterial.diffuseTexture.vScale = 20;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;

    //generate skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    // skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/texture/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    //generate fog
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.0003;
    scene.fogColor = BABYLON.Color3.FromInts(222,222,222);

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