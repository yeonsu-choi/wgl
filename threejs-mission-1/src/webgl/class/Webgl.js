import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export class Webgl {
  constructor(_options) {
    this.parentContainerClass = _options.parentContainerClass
    this.container = _options.container
    this.sceneOptions = _options.sceneOptions
    this.cameraOptions = _options.cameraOptions
    this.isDebug = _options.isDebug
    this.mouse = new THREE.Vector2(0, 0)
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.canvasWidth = document.querySelector(this.parentContainerClass).offsetWidth
    this.canvasHeight = document.querySelector(this.parentContainerClass).offsetHeight

    this.init()
  }

  init() {
    //scene
    this.scene = new THREE.Scene()
    if (this.sceneOptions.backgroundColor != undefined)
      this.scene.background = new THREE.Color(this.sceneOptions.backgroundColor)

    this.scene.position.y = -0.35

    //camera
    this.camera = new THREE.PerspectiveCamera(
      this.cameraOptions.fov,
      this.canvasWidth / this.canvasHeight,
      this.cameraOptions.near,
      this.cameraOptions.far
    )
    this.camera.position.set(this.cameraOptions.x, this.cameraOptions.y, this.cameraOptions.z)
    this.camera.name = 'mainCamera'
    this.scene.add(this.camera)

    //renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setPixelRatio(this.pixelRatio)
    this.renderer.setSize(this.canvasWidth, this.canvasHeight)
    this.renderer.shadowMap.enabled = false
    this.renderer.outputEncoding = THREE.LinearEncoding
    this.container.appendChild(this.renderer.domElement)

    //controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enabled = true

    this.controls.minPolarAngle = Math.PI * 0.3
    this.controls.maxPolarAngle = Math.PI * 0.68
    this.controls.minAzimuthAngle = Math.PI * -0.25
    this.controls.maxAzimuthAngle = Math.PI * 0.25

    //listeners
    window.addEventListener('resize', this.onWindowResize.bind(this), false)
  }

  onWindowResize() {
    let newWidth = document.querySelector(this.parentContainerClass).offsetWidth
    let newHeight = document.querySelector(this.parentContainerClass).offsetHeight

    this.camera.aspect = newWidth / newHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)
  }
}
