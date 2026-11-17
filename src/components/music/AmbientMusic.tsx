import { useEffect, useRef, useState } from 'react'
import { Music2, VolumeX } from 'lucide-react'

/**
 * Soft, generative ambient music made with the Web Audio API.
 * No audio files are needed: slow warm chord pads with a gentle echo
 * and the occasional quiet bell note. Browsers only allow sound after a
 * user interaction, so it starts on the first click/tap/keypress (unless
 * the visitor has turned it off before) and can be toggled any time.
 */

const STORAGE_KEY = 'manzil-music'

// Calm progression: Cmaj7 – Am7 – Fmaj7 – G6 (frequencies in Hz)
const CHORDS = [
  [130.81, 196.0, 246.94, 329.63],
  [110.0, 164.81, 220.0, 261.63],
  [87.31, 174.61, 220.0, 329.63],
  [98.0, 146.83, 246.94, 329.63],
]
const BELLS = [523.25, 587.33, 659.25, 783.99, 880.0]
const CHORD_SECONDS = 8

class AmbientEngine {
  ctx: AudioContext
  master: GainNode
  private bus: BiquadFilterNode
  private timer: number | undefined
  private step = 0

  constructor() {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0
    this.master.connect(this.ctx.destination)

    // Warm low-pass filter
    this.bus = this.ctx.createBiquadFilter()
    this.bus.type = 'lowpass'
    this.bus.frequency.value = 1400
    this.bus.Q.value = 0.3
    this.bus.connect(this.master)

    // Soft echo for a sense of space
    const delay = this.ctx.createDelay(2)
    delay.delayTime.value = 0.6
    const feedback = this.ctx.createGain()
    feedback.gain.value = 0.35
    const wet = this.ctx.createGain()
    wet.gain.value = 0.3
    this.bus.connect(delay)
    delay.connect(feedback)
    feedback.connect(delay)
    delay.connect(wet)
    wet.connect(this.master)
  }

  private tone(freq: number, start: number, duration: number, peak: number, type: OscillatorType) {
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = (Math.random() - 0.5) * 8
    gain.gain.setValueAtTime(0, start)
    gain.gain.linearRampToValueAtTime(peak, start + duration * 0.35)
    gain.gain.linearRampToValueAtTime(0, start + duration)
    osc.connect(gain)
    gain.connect(this.bus)
    osc.start(start)
    osc.stop(start + duration + 0.1)
  }

  private playStep() {
    const now = this.ctx.currentTime + 0.05
    const chord = CHORDS[this.step % CHORDS.length]
    chord.forEach((f, i) => {
      this.tone(f, now, CHORD_SECONDS + 2, i === 0 ? 0.09 : 0.05, 'sine')
      this.tone(f * 2, now + 0.2, CHORD_SECONDS + 1.5, 0.012, 'triangle')
    })
    // A couple of quiet bell notes per chord
    for (let i = 0; i < 2; i++) {
      if (Math.random() < 0.7) {
        const bell = BELLS[Math.floor(Math.random() * BELLS.length)]
        this.tone(bell, now + 1 + Math.random() * (CHORD_SECONDS - 3), 3.5, 0.02, 'sine')
      }
    }
    this.step++
  }

  async start() {
    await this.ctx.resume()
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(this.master.gain.value, t)
    this.master.gain.linearRampToValueAtTime(0.5, t + 3)
    if (this.timer === undefined) {
      this.playStep()
      this.timer = window.setInterval(() => this.playStep(), CHORD_SECONDS * 1000)
    }
  }

  stop() {
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(this.master.gain.value, t)
    this.master.gain.linearRampToValueAtTime(0, t + 1.5)
    window.setTimeout(() => {
      if (this.timer !== undefined) {
        window.clearInterval(this.timer)
        this.timer = undefined
      }
      this.ctx.suspend()
    }, 1600)
  }
}

export function AmbientMusic() {
  const engine = useRef<AmbientEngine | null>(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    if (!engine.current) engine.current = new AmbientEngine()
    engine.current.start()
    setPlaying(true)
    localStorage.setItem(STORAGE_KEY, 'on')
  }

  const pause = () => {
    engine.current?.stop()
    setPlaying(false)
    localStorage.setItem(STORAGE_KEY, 'off')
  }

  // Start softly on the visitor's first interaction, unless they turned it off before
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === 'off') return
    const kickoff = (e: Event) => {
      if ((e.target as HTMLElement)?.closest?.('[data-music-toggle]')) return
      play()
      remove()
    }
    const events = ['pointerdown', 'keydown', 'touchstart']
    const remove = () => events.forEach(ev => window.removeEventListener(ev, kickoff))
    events.forEach(ev => window.addEventListener(ev, kickoff, { once: true }))
    return remove
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => () => { engine.current?.ctx.close() }, [])

  return (
    <button
      data-music-toggle
      onClick={() => (playing ? pause() : play())}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      title={playing ? 'Pause music' : 'Play soft music'}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-manzil-200/80 bg-white/80 px-4 py-2.5 text-sm text-manzil-700 shadow-lg shadow-manzil-900/5 backdrop-blur-md transition hover:border-manzil-gold hover:text-manzil-gold"
    >
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map(i => (
            <span key={i} className="music-bar w-[3px] rounded-full bg-manzil-gold" style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
        </span>
      ) : (
        <Music2 className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{playing ? 'Music on' : 'Play music'}</span>
      {playing && <VolumeX className="hidden h-3.5 w-3.5 opacity-50 sm:inline" />}
    </button>
  )
}
