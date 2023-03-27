import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const FPS = 30
const container = document.getElementById('container');

// https://sketchfab.com/3d-models/dunsparce-ed68a375f9e84388a6de28f56c9ae0c7
// https://sketchfab.com/3d-models/bocchi-the-rock-634c4da47a5a445da5cb0e45774b9fa1
class Spin {
    async init() {
        container.innerHTML = ""

        this.model_paths = [
            'assets/models/dunsparce.glb',
            'assets/models/soldier.glb'
        ]
        this.loader = new GLTFLoader();

        this.models = []
        for (let path of this.model_paths) {
            // TODO use Promise.all
            let model = await this._load_model(path)
            this.models.push(model)
        }



        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 2, - 3);
        this.camera.lookAt(0, 0, 0);
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0xffffff))

        this.scene.add(this.models[0].scene)

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        container.appendChild(this.renderer.domElement);
        this._play_music()
    }

    async _load_model(path) {
        return await this.loader.loadAsync(path.toString())
    }

    _play_music() {
        var audio = new Audio('assets/audio/freebird.mp3');
        audio.play();
    }

    _set_model(model) {

    }


    run() {
        this._update()
        this._render()
        setTimeout(this.run.bind(this), 1 / FPS * 1000)

    }

    _render() {
        this.renderer.render(this.scene, this.camera)
        try {
            // let model = this.scene.children[1]
            //model.rotation.y += 1 / 180 * 30
        } catch (error) {
            console.log(error)
        }

    }

    _update() {
        this.scene.children[1].rotation.y += -0.2
    }

    onresize() {

    }
}

async function main() {
    let spin = new Spin()
    await spin.init()
    spin.run()
}

document.getElementById("begin-button").onclick = main