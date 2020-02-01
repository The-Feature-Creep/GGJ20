/**
 * @author mrdoob / http://www.mrdoob.com
 *
 * Simple test shader
 */

import {
  Color
} from "three";

var BasicShader = {

  uniforms: {
    "color": { value: new Color( 0xffffff ) },
    "emissive": { value: new Color( 0x000000 ) },
    "amount": { value: 1 },
    "opacity": { value: 1.0 },
  },

  vertexShader: [

    "void main() {",

    " gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",

    "}"

  ].join( "\n" ),

  fragmentShader: [

    "uniform vec3 color;",
    "uniform float amount;",
    "uniform float death;",

    "void main() {",

    " gl_FragColor = vec4(color, 1.0) + vec4(1.0, 0.0, 0.0, 1.0) * amount;",
    //" gl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );",

    "}"

  ].join( "\n" )

};

export { BasicShader };
