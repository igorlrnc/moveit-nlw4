import styles from '../styles/components/Countdown.module.css'
import { useState, useEffect } from "react";

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
  const [time, setTime] = useState(0.05 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = minutes.toString().padStart(2, '0').split('')
  const [secondLeft, secondRight] = seconds.toString().padStart(2, '0').split('')

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
    }
  }, [isActive, time])

  function startCountdown() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(0.05 * 60)
  }

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo finalizado
        </button>
      ) : (
          <>
            {
              isActive ? (
                <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountdown}>
                  Abandonar ciclo
                </button>
              ) : (
                  <button type="button" className={styles.countdownButton} onClick={startCountdown}>
                    Iniciar um ciclo
                  </button>
                )
            }
          </>
        )
      }
    </>
  )
}
