'use client'
import { useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim' // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

export const ParticleSystem = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  }

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
      },
      particles: {
        color: {
          value: ['#000', '#d0000e', '#f2cb01'],
        },
        links: {
          color: '#ffffff',
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.bounce,
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 3,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: 'circle',
        },
        stroke: {
          color: '#fff',
          width: 1,
        },
        size: {
          value: { min: 19, max: 23 },
        },
        roll: {
          darken: {
            enable: true,
            value: 1,
          },
          enable: false,
          enlighten: {
            enable: true,
            value: 0.5,
          },
          mode: 'vertical',
          speed: 1,
        },
        tilt: {
          value: 1,
          animation: {
            enable: true,
            speed: 1,
            decay: 0.1,
            sync: false,
          },
          direction: 'clockwise',
          enable: false,
        },
        wobble: {
          distance: 5,
          enable: false,
          speed: {
            angle: 150,
            move: 100,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    )
  }

  return <></>
}
