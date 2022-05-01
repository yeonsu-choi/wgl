import * as THREE from 'three'
import { StageObject } from './class/StageObject.js'
import { STATE, ASSETS } from './global.js'

import * as SCENE_PROPERTIES from './stageObjects/sceneProperties.js'

export function loadStage(sceneName) {
  switch (sceneName) {
    case 'main':
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
      directionalLight.position.set(5, 6, 4)
      STATE.WEBGL.scene.add(directionalLight)

      const SCENE_MESH = ASSETS.MAIN.MODEL_FILES.find(obj => { return obj.name === "scene" })
      const SCENE_OBJECT = new StageObject({
        originalObject: SCENE_MESH.asset.scene,
        clonedObject: SCENE_MESH.asset.scene.clone(),
        objectName: 'scene',
        definition: SCENE_PROPERTIES,
      })

      SCENE_OBJECT.clone.traverse(child => {
        // traverse all child objects

        if (child.name === "Cube") {
          child.scale.x = 2.2
          child.scale.y = .13
          child.scale.z = 2.2
        }
      })

      const CUBE_geometry = new THREE.BoxGeometry(1, 1, 1);
      const CUBE_material = new THREE.MeshPhongMaterial({
        color: 0x0000ff,
        transparent: true,
        opacity: 0.5,
      });
      const CUBE_OBJECT = new THREE.Mesh(CUBE_geometry, CUBE_material);

      //[NOTE] 빛이 균등하게 들어오지 않음
      //[NOTE] 유리느낌 내는게 MeshPhongMaterial 맞는지
      //[NOTE] 박스 추가나 기존 소스 변경법이 이게 맞는지

      console.log(CUBE_OBJECT);
      CUBE_OBJECT.position.y = 0.38

      CUBE_OBJECT.scale.x = 1.253
      CUBE_OBJECT.scale.y = 0.8
      CUBE_OBJECT.scale.z = 1.253

      STATE.WEBGL.scene.add(CUBE_OBJECT)
      STATE.WEBGL.scene.add(SCENE_OBJECT.clone)

      break
  }
}

export function toggleStages(toggle, sceneName) {
  let stagesObjects = STATE.WEBGL.scene.children.filter(function (obj) { return obj.name === sceneName })

  if (stagesObjects != undefined) {
    for (let stagesObject of stagesObjects) {
      toggle ? stagesObject.visible = true : stagesObject.visible = false
    }
  }
}