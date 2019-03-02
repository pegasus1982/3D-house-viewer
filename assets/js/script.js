var canvas = document.getElementById('renderCanvas');
const ANIM_DURATION = 15;

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true, { stencil: true });

var scene,
    camera,
    light1,
    light2,
    ground;

var advancedTexture;

var modelHouse;

var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.ArcRotateCamera("Camera", -0.36, 1.53, 2000, new BABYLON.Vector3(0,100,0), scene);
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
        modelHouse = task.loadedMeshes;
    }

    meshTask1.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    assetsManager.load();

    //generate ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "assets/texture/heightMap-01.png", 6000, 6000, 30, 0, 500, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("assets/texture/grass.png", scene);

    groundMaterial.diffuseTexture.uScale = 40;
    groundMaterial.diffuseTexture.vScale = 40;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.checkCollisions = true;

    ground.onReady = function(){
        ground.optimize(100);

        var shadowGenerator = new BABYLON.ShadowGenerator(1024,light1);

        BABYLON.SceneLoader.ImportMesh("","assets/models/terrain/","tree-01.babylon",scene, function(newMeshes){
            newMeshes[0].material.opacityTexture = null;
            newMeshes[0].material.backFaceCulling = false;
            newMeshes[0].isVisible = false;
            newMeshes[0].position.y = ground.getHeightAtCoordinates(0, 0); // Getting height from ground object

            // shadowGenerator.getShadowMap().renderList.push(newMeshes[0]);
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

                // shadowGenerator.getShadowMap().renderList.push(newInstance);
            }
            shadowGenerator.getShadowMap().refreshRate = 0; // We need to compute it just once
            shadowGenerator.usePoissonSampling = true;

            // Collisions
            camera.checkCollisions = true;
            camera.applyGravity = true;
        })
    }

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
    // scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    // scene.fogDensity = 0.0003;
    // scene.fogColor = BABYLON.Color3.FromInts(222,222,222);

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
        else if(modelName.includes('DOOR_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('CEIL_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('WIND_F1_'))
            modelHouse[i].visibility = false;
        else if(modelName == 'CEIL_F1_FOUNDATIONS_CONCEPT_WHITE')
            modelHouse[i].visibility = false;
        else if(modelName == 'MESH_GF_GROUND_FLOOR_CONCRETE___GENERAL')
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
        else if(modelName.includes('DOOR_GF_'))
            modelHouse[i].visibility = false;
        else if(modelName.includes('WIND_GF_'))
            modelHouse[i].visibility = false;
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
    }
}

//add floor select event
$('.select-floor').click(function(){
    var numFloor = $(this).attr('floor');
    numFloor = parseInt(numFloor);

    for(var i in modelHouse){
        modelHouse[i].visibility = true;
    }
    //in case of floor 1 selected
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