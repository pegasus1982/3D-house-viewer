var canvas = document.getElementById('renderCanvas');
const ANIM_DURATION = 15;

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

var scene,
    camera,
    light1,
    light2,
    light3,
    ground;

var advancedTexture;

var modelHouse;
var planList = [
    {
        name : "PLAN_FLOOR_02_ROOM_001",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_002",
        target : "floor-02-room-02.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_003",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_004",
        target : "floor-02-room-02.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_005",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_006",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_007",
        target : "floor-02-room-02.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_008",
        target : "floor-02-room-02.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_009",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_010",
        target : "floor-02-room-02.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_011",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_012",
        target : "floor-02-room-02.png"
    },
    {
        name : "PLAN_FLOOR_02_ROOM_013",
        target : "floor-02-room-02.png"
    },

    {
        name : "PLAN_FLOOR_01_ROOM_001",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_002",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_003",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_004",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_005",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_006",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_007",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_008",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_009",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_010",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_011",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_012",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_013",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_014",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_015",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_016",
        target : "floor-02-room-01.png"
    },
    {
        name : "PLAN_FLOOR_01_ROOM_017",
        target : "floor-02-room-01.png"
    },
];

var cameraSticker1,
    cameraSticker2,
    cameraSticker3,
    cameraSticker4;

var universalCamera1,
    universalCamera2,
    universalCamera3,
    universalCamera4;

var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.ArcRotateCamera("Camera", -0.36, 1.53, 1500, new BABYLON.Vector3(0,50,0), scene);
    camera.attachControl(canvas, false);
    camera.upperBetaLimit = 1.57;
    // camera.lowerBetaLimit = 0.4;
    camera.wheelPrecision = 0.2;
    
    camera.upperRadiusLimit = 2000;
    camera.lowerRadiusLimit = 500;

    // light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(4000, 6000, 5000), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-4000, 7000, -6000), scene);
    light3 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(4000, 2000, -900), scene);

    var shadowGenerator = new BABYLON.ShadowGenerator(1024,light3);
    var assetsManager = new BABYLON.AssetsManager(scene);

    // load house model
    var meshTask1 = assetsManager.addMeshTask("model task", "", "assets/models/house/", "house.babylon");
    meshTask1.onSuccess = function (task) {
        for(var i in task.loadedMeshes){
            if(task.loadedMeshes[i].name.includes("PLAN_FLOOR_01") || task.loadedMeshes[i].name.includes("PLAN_FLOOR_02")){
                task.loadedMeshes[i].visibility = false;
            }
            task.loadedMeshes[i].position.y -= 35;
        }
        modelHouse = task.loadedMeshes;
        for(var i in modelHouse){
            if(modelHouse[i].material.name == '_BARN H objGLASS___CLEAR'){
                modelHouse[i].material.reflectionTexture = new BABYLON.CubeTexture("assets/texture/skybox/TropicalSunnyDay", scene);
                modelHouse[i].material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
                modelHouse[i].material.reflectionFresnelParameters.power = 100;
                modelHouse[i].material.specularPower = 500;
            }
        }
    }

    meshTask1.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    assetsManager.load();

    // var box1 = new BABYLON.Mesh.CreateBox("box 1",40,scene,false);
    // box1.position = new BABYLON.Vector3(100,100,100)
    // var shadowGenerator1 = new BABYLON.ShadowGenerator(512,light3);
    // shadowGenerator1.getShadowMap().renderList.push(box1);
    // shadowGenerator1.useBlurExponentialShadowMap = true;
    // shadowGenerator1.blurBoxOffset = 2.0;

    //generate ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "assets/texture/heightMap-01.png", 6000, 6000, 30, 0, 500, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/texture/grass.jpg", scene);

    groundMaterial.diffuseTexture.uScale = 40;
    groundMaterial.diffuseTexture.vScale = 40;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;

    ground.onReady = function(){
        ground.optimize(100);

        //scatter trees
        BABYLON.SceneLoader.ImportMesh("","assets/models/terrain/","tree-01.babylon",scene, function(newMeshes){
            newMeshes[0].material.opacityTexture = null;
            newMeshes[0].material.backFaceCulling = false;
            newMeshes[0].isVisible = false;
            newMeshes[0].position.y = ground.getHeightAtCoordinates(0, 0); // Getting height from ground object

            shadowGenerator.getShadowMap().renderList.push(newMeshes[0]);
            var treeAxis = [
                [2000,  2000,   0],
                [-2000, 2000,   100],
                [-1800, 2300,   200],
                [-2500, 1800,   240],
                [-2000, 1600,   100],
                [-2500, 1400,   100],
                [-1000, 1000,   0],
                [-1500, 400,    0],
                [-1200, 0,      0],
                [-1500, -300,   0],
                [-2500, 0,      0],
                [-2000, -300,   0],
                [-2200, -900,   0],
                [-1600, -1400,  0],
                [0,     1200,   0],
                [400,   1200,   0],
                [800,   1200,   0],
                [-200,  1600,   0],
                [200,   2000,   0],
                [600,   1800,   0],
                [0,     -800,   0],
                [400,   -1100,  0],
                [800,   -1400,  0],
                [-900,  -1300,  0],
                [-600,  -1100,  0],
                [-800,  -1900,  0],
            ];
            for (var index = 0; index < treeAxis.length; index++) {
                var newInstance = newMeshes[0].createInstance("i" + index);
                var x = treeAxis[index][0];
                var z = treeAxis[index][1];
                var y = treeAxis[index][2];

                newInstance.position = new BABYLON.Vector3(x, y, z);

                newInstance.rotate(BABYLON.Axis.Y, Math.random() * Math.PI * 2, BABYLON.Space.WORLD);

                var scale = 0.5 + Math.random() * 2;
                newInstance.scaling.addInPlace(new BABYLON.Vector3(scale, scale, scale));

                shadowGenerator.getShadowMap().renderList.push(newInstance);
            }
            shadowGenerator.getShadowMap().refreshRate = 0; // We need to compute it just once
            shadowGenerator.usePoissonSampling = true;

            // Collisions
            camera.checkCollisions = true;
            camera.applyGravity = true;
        });
    }

    //generate skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    // skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/texture/skybox/TropicalSunnyDay", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skybox.rotation.y = -Math.PI/2;
    
    BABYLON.SceneLoader.ImportMesh("","assets/models/terrain/","map-sticker.babylon",scene, function(newMeshes){
        var cameraStickerPosition = [
            [600,600],
            [1500,-500],
            [-1000,-800],
            [-800,700]
        ];

        cameraSticker1 = newMeshes[0];
        cameraSticker1.position.x = cameraStickerPosition[0][0];
        cameraSticker1.position.y = 10;
        cameraSticker1.position.z = cameraStickerPosition[0][1];
        cameraSticker1.name = "camera-sticker-01";
        cameraSticker1.rotate(BABYLON.Axis.Y, Math.random() * Math.PI * 2, BABYLON.Space.WORLD);

        universalCamera1 = new BABYLON.UniversalCamera("camera-001",new BABYLON.Vector3(cameraStickerPosition[0][0],60,cameraStickerPosition[0][1]),scene);
        universalCamera1.setTarget(BABYLON.Vector3.Zero());
        universalCamera1.keysDown = [];
        universalCamera1.keysUp = [];
        universalCamera1.keysLeft = [];
        universalCamera1.keysRight = [];
        // scene.activeCamera = universalCamera1;
        // scene.activeCamera.attachControl(canvas,false);
        // console.log('universal camera',universalCamera1);

        cameraSticker2 = cameraSticker1.clone();
        cameraSticker2.position.x = cameraStickerPosition[1][0];
        cameraSticker2.position.z = cameraStickerPosition[1][1];
        cameraSticker2.name = "camera-sticker-02";
        cameraSticker2.rotate(BABYLON.Axis.Y, Math.random() * Math.PI * 2, BABYLON.Space.WORLD);

        universalCamera2 = new BABYLON.UniversalCamera("camera-002",new BABYLON.Vector3(cameraStickerPosition[1][0],60,cameraStickerPosition[1][1]),scene);
        universalCamera2.setTarget(BABYLON.Vector3.Zero());
        universalCamera2.keysDown = [];
        universalCamera2.keysUp = [];
        universalCamera2.keysLeft = [];
        universalCamera2.keysRight = [];
        // scene.activeCamera = universalCamera2;
        // scene.activeCamera.attachControl(canvas,false);

        cameraSticker3 = cameraSticker1.clone();
        cameraSticker3.position.x = cameraStickerPosition[2][0];
        cameraSticker3.position.z = cameraStickerPosition[2][1];
        cameraSticker3.name = "camera-sticker-03";
        cameraSticker3.rotate(BABYLON.Axis.Y, Math.random() * Math.PI * 2, BABYLON.Space.WORLD);

        universalCamera3 = new BABYLON.UniversalCamera("camera-003",new BABYLON.Vector3(cameraStickerPosition[2][0],60,cameraStickerPosition[2][1]),scene);
        universalCamera3.setTarget(BABYLON.Vector3.Zero());
        universalCamera3.keysDown = [];
        universalCamera3.keysUp = [];
        universalCamera3.keysLeft = [];
        universalCamera3.keysRight = [];
        // scene.activeCamera = universalCamera3;
        // scene.activeCamera.attachControl(canvas,false);

        cameraSticker4 = cameraSticker1.clone();
        cameraSticker4.position.x = cameraStickerPosition[3][0];
        cameraSticker4.position.z = cameraStickerPosition[3][1];
        cameraSticker4.name = "camera-sticker-04";
        cameraSticker4.rotate(BABYLON.Axis.Y, Math.random() * Math.PI * 2, BABYLON.Space.WORLD);

        universalCamera4 = new BABYLON.UniversalCamera("camera-004",new BABYLON.Vector3(cameraStickerPosition[3][0],60,cameraStickerPosition[3][1]),scene);
        universalCamera4.setTarget(BABYLON.Vector3.Zero());
        universalCamera4.keysDown = [];
        universalCamera4.keysUp = [];
        universalCamera4.keysLeft = [];
        universalCamera4.keysRight = [];
        // scene.activeCamera = universalCamera4;
        // scene.activeCamera.attachControl(canvas,false);

        scene.registerBeforeRender(function(){
            cameraSticker1.rotation.y += 0.1;
            cameraSticker2.rotation.y += 0.1;
            cameraSticker3.rotation.y += 0.1;
            cameraSticker4.rotation.y += 0.1;
        })
    });

    //import garden
    BABYLON.SceneLoader.ImportMesh("","assets/models/terrain/","garden.babylon",scene, function(newMeshes){
        for(var i in newMeshes){
            newMeshes[i].position.z += 19;
        }
    });
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

function hideFloor1(){
    for(var i in modelHouse){
        var modelName = modelHouse[i].name;
        if(modelName.includes('CEIL_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('BEAM_F1_'))
            modelHouse[i].visibility = false;
        // else if(modelName.includes('DOOR_F1_'))
            // modelHouse[i].visibility = false;
        else if(modelName.includes('CEIL_GF_'))
            modelHouse[i].visibility = false;
        // else if(modelName.includes('WIND_F1_'))
            // modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_CONCEPT_WHITE')
            modelHouse[i].visibility = false;
        else if(modelName == 'MESH_GF_GROUND_FLOOR_CONCRETE___GENERAL')
            modelHouse[i].visibility = false;

        if(modelName.includes("PLAN_FLOOR_02"))
            modelHouse[i].visibility = false;
    }
}
function hideFloor1Base(){
    for(var i in modelHouse){
        var modelName = modelHouse[i].name;
        if(modelName.includes('CEIL_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('BEAM_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('DOOR_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('OBJ_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('WALL_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('WIND_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName == 'MESH_GF_GROUND_FLOOR_CONCRETE___GENERAL')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM59_PDM_GLASS_SIDEBOARD_0')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM60_PDM_STEEL_BRUSHED_54_FLAT_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM60_PDM_STEEL_BRUSHED_54_SMOOTH_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM61_0044_DARKGOLDENROD')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM58__COLOR_F17_2')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM56__AUTO_2_38')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GLASS___BLUE_SMOOTH_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GLASS___BLUE_FLAT_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM58__COLOR_F17_2')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM57_0022_MAROON')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM53__0136_CHARCOAL_1_FLAT_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM53__0136_CHARCOAL_1_SMOOTH_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_CONCEPT_WHITE')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM54_DEFAULT')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_WOOD___HARDWOOD')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_PAINT_IVORY_BLACK_FLAT_PART')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_PAINT_IVORY_BLACK')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM63_0038_ORANGE')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM63_0038_ORANGE')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_WOOD___HARDWOOD')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_SURF_PORCELAIN')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_SURF___PLASTIC_LAMINATE')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_PAINT___TITANIUM_WHITE')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_FINISH___FLOOR_CARPET')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_CONCRETE___GENERAL')
            modelHouse[i].visibility = true;

        if(modelName.includes("PLAN_FLOOR_01"))
            modelHouse[i].visibility = true;
        if(modelName.includes("PLAN_FLOOR_02"))
            modelHouse[i].visibility = false;
    }
}

function hideFloor2(){
    for(var i in modelHouse){
        var modelName = modelHouse[i].name;
        // console.log('name',modelName);
        if(modelName.includes('ROOF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('SKY_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('BEAM_GF_'))
            modelHouse[i].visibility = false;
        // else if(modelName.includes('DOOR_GF_'))
        //     modelHouse[i].visibility = false;
        // else if(modelName.includes('WIND_GF_'))
            // modelHouse[i].visibility = false;
        else if(modelName.includes('COLU_GF_'))
            modelHouse[i].visibility = false;
    }
}
function hideFloor2Base(){
    for(var i in modelHouse){
        var modelName = modelHouse[i].name;
        if(modelName.includes('ROOF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('SKY_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('BEAM_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('DOOR_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('WIND_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('OBJ_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('COLU_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('WALL_GF_'))
            modelHouse[i].visibility = false;

        else if(modelName == 'CEIL_GF_GROUND_FLOOR_PAINT___TITANIUM_WHITE')
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_GF_GROUND_FLOOR_WOOD___SOFTWOOD')
            modelHouse[i].visibility = false;
        else if(modelName == 'OBJ_F1_FOUNDATIONS_GDLM62_0133_GRAY')
            modelHouse[i].visibility = false;

        if(modelName.includes("PLAN_FLOOR_02"))
            modelHouse[i].visibility = true;
    }
}

//add floor select event
function loadPlan(){
    for(var i in modelHouse){
        if(modelHouse[i].name.includes("PLAN_FLOOR_01") || modelHouse[i].name.includes("PLAN_FLOOR_02")){
            modelHouse[i].material = new BABYLON.StandardMaterial(modelHouse[i].name+'_material', scene);
            modelHouse[i].material.diffuseTexture = new BABYLON.Texture(modelHouse[i].name.includes('PLAN_FLOOR_01')?"assets/texture/plans/floor-plan-1.png":"assets/texture/plans/floor-plan-2.png", scene);
            modelHouse[i].material.diffuseTexture.vOffset = 200;
            modelHouse[i].material.diffuseTexture.uScale = 0.0016;
            modelHouse[i].material.diffuseTexture.vScale = 0.0016;
            modelHouse[i].material.specularColor = new BABYLON.Color3(0, 0, 0);
        }
    }
}
$('.select-floor').click(function(){
    var numFloor = $(this).attr('floor');
    numFloor = parseInt(numFloor);

    for(var i in modelHouse){
        if(modelHouse[i].name.includes("PLAN_FLOOR_01") || modelHouse[i].name.includes("PLAN_FLOOR_02")){
            modelHouse[i].visibility = false;
        }
        else{
            modelHouse[i].visibility = true;
        }
        
    }
    loadPlan();

    if(numFloor == 1){
        hideFloor2Base();
        hideFloor1();
    }
    else if(numFloor == 2){
        hideFloor2Base();
        hideFloor1Base();
    }
    else if(numFloor == 3){
        hideFloor2();
    }
    //in case of floor 2 selected
    else if(numFloor == 4){
        console.log('floor 2 selected');
        hideFloor2Base();
    }
})

$('.normal-view').click(function(){
    cameraSticker1.visibility = true;
    cameraSticker2.visibility = true;
    cameraSticker3.visibility = true;
    cameraSticker4.visibility = true;

    scene.activeCamera = camera;
    scene.activeCamera.attachControl(canvas,false);
})

//mouse move event
var current = null;
function onPointerMove(evt){
    var pickInfo = scene.pick(scene.pointerX, scene.pointerY,function(mesh){
        return (mesh.visibility && (mesh.name.includes("PLAN_FLOOR_01") || mesh.name.includes("PLAN_FLOOR_02")))
    })
    if(pickInfo.hit){
        var currentMesh = pickInfo.pickedMesh;
        var isPlan = false;
        for(var i in planList){
            if(currentMesh.visibility && currentMesh.name == planList[i].name){
                isPlan = true;
                break;
            }
        }
        if(isPlan){
            if(current !== currentMesh){
                current = currentMesh;
            }
            else return;

            loadPlan();
            var random = Math.floor(Math.random()*10)%3 + 1;
            currentMesh.material = new BABYLON.StandardMaterial(currentMesh.name+random, scene);
            var baseUrl;
            if(currentMesh.name.includes("PLAN_FLOOR_02"))
                baseUrl = "assets/texture/plans/floor-plan-2-random-color-";
            else
                baseUrl = "assets/texture/plans/floor-plan-1-random-color-";
            currentMesh.material.diffuseTexture = new BABYLON.Texture(baseUrl+random+".png", scene);
            currentMesh.material.diffuseTexture.uScale = 0.0016;
            currentMesh.material.diffuseTexture.vScale = 0.0016;
            currentMesh.material.specularColor = new BABYLON.Color3(0, 0, 0);
        }
    }
}

function showModal(target){
    $('body').append(
                '<div class="modal-container">'+
                '<div class="modal-content">'+
                '<div class="close-modal"></div>'+
                '<img src="assets/texture/plans/seperated-plans/'+target+'"></img>'+
                '</div>'+
                '</div>'
            );

    $('.close-modal').click(function(){
        $('.modal-container').remove();
    })
}
function onPointerDown(evt){
    var pickInfo = scene.pick(scene.pointerX, scene.pointerY,function(mesh){
        return (mesh.visibility && (mesh.name.includes("PLAN_FLOOR_01") || mesh.name.includes("PLAN_FLOOR_02") || mesh.name.includes('camera-sticker-')))
    })
    if(pickInfo.hit){
        var currentMesh = pickInfo.pickedMesh;
        console.log(currentMesh.name)
        //if plan
        if(currentMesh.name.includes("PLAN_FLOOR_01") || currentMesh.name.includes("PLAN_FLOOR_02"))
        {
            var isPlan = false;
            var target = null;
            for(var i in planList){
                if(currentMesh.visibility && currentMesh.name == planList[i].name){
                    isPlan = true;
                    target = planList[i].target;
                    break;
                }
            }
            if(isPlan){
                showModal(target);
            }
        }
        //else if sticker
        else if(currentMesh.name.includes('camera-sticker-')){
            cameraSticker1.visibility = true;
            cameraSticker2.visibility = true;
            cameraSticker3.visibility = true;
            cameraSticker4.visibility = true;

            switch(currentMesh.name){
                case 'camera-sticker-01':
                    scene.activeCamera = universalCamera1;
                    scene.activeCamera.attachControl(canvas,false);
                    cameraSticker1.visibility = false;
                    break;
                case 'camera-sticker-02':
                    scene.activeCamera = universalCamera2;
                    scene.activeCamera.attachControl(canvas,false);
                    cameraSticker2.visibility = false;
                    break;
                case 'camera-sticker-03':
                    scene.activeCamera = universalCamera3;
                    scene.activeCamera.attachControl(canvas,false);
                    cameraSticker3.visibility = false;
                    break;
                case 'camera-sticker-04':
                    scene.activeCamera = universalCamera4;
                    scene.activeCamera.attachControl(canvas,false);
                    cameraSticker4.visibility = false;
                    break;
                default:
                    return;
            }
        }
    }
}

var canvas = engine.getRenderingCanvas();
canvas.addEventListener('pointermove',onPointerMove);
canvas.addEventListener('pointerdown',onPointerDown);