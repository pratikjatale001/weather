import React, { useState, useEffect } from 'react'
import '../styles/HomePage.css'
import { motion } from 'framer-motion'
import gsap from 'gsap'

function HomePage({ onSearch, loading }) {
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  }

  const illustrationVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.3 },
    },
  }

  return (
    <motion.div
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="home-content">
        {/* Left Side - Title and Search */}
        <motion.div className="home-left" variants={itemVariants}>
          <motion.div className="home-header" variants={titleVariants}>
            <motion.h1
              className="home-title"
              whileHover={{ scale: 1.05, letterSpacing: '2px' }}
              transition={{ duration: 0.3 }}
            >
              Weather App
            </motion.h1>
          </motion.div>

          <motion.div className="search-section" variants={itemVariants}>
            <SearchInput onSearch={onSearch} loading={loading} />
          </motion.div>

          <motion.div
            className="home-description"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <p>Get accurate weather forecasts for any city around the world</p>
          </motion.div>
        </motion.div>

        {/* Right Side - Illustration */}
        <motion.div
          className="home-right"
          variants={illustrationVariants}
        >
          <WeatherIllustration />
        </motion.div>
      </div>
    </motion.div>
  )
}

function WeatherIllustration() {
  useEffect(() => {
    // GSAP animations for illustration elements
    gsap.to('.sun', {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })

    gsap.to('.cloud1', {
      x: 30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    gsap.to('.cloud2', {
      x: -30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5,
    })

    gsap.to('.rain', {
      y: 20,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <div className="weather-illustration">
      <motion.div
        className="sun"
        whileHover={{ scale: 1.2 }}
      >
        ☀️
      </motion.div>
      <motion.div
        className="cloud1"
        whileHover={{ scale: 1.1 }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="cloud2"
        whileHover={{ scale: 1.1 }}
      >
        ☁️
      </motion.div>
      <motion.div
        className="rain"
        whileHover={{ scale: 1.15 }}
      >
        🌧️
      </motion.div>
    </div>
  )
}

function SearchInput({ onSearch, loading }) {
  const [input, setInput] = useState('')

  const handleSearch = () => {
    onSearch(input)
    setInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 20px rgba(77, 166, 214, 0.4)',
      transition: { duration: 0.3 },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <motion.div className="search-input-wrapper">
      <motion.input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for a city..."
        disabled={loading}
        className="home-search-input"
        whileFocus="focus"
        variants={inputVariants}
      />
      <motion.button
        onClick={handleSearch}
        disabled={loading}
        className="home-search-button"
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
      >
        <motion.span
          animate={{ rotate: loading ? 360 : 0 }}
          transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
        >
          {loading ? '⏳' : 'SEARCH'}
        </motion.span>
      </motion.button>
    </motion.div>
  )
}

export default HomePage
