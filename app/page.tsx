"use client"

import { MenuBar } from "@/components/menu-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { Mail, MapPin, Leaf, Recycle, Beaker } from "lucide-react"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const hasPlayedRef = useRef(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleCanPlay = () => {
        // Video her zaman sessiz
        video.muted = true
        video.play().catch(() => {
          console.log('Autoplay blocked, waiting for user interaction')
        })
      }

      const handleEnded = () => {
        // Video bittiğinde sessiz olarak tekrar başlat
        video.muted = true
        video.play().catch(console.error)
      }

      // Intersection Observer ile video görünürlüğünü takip et
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {})
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(video)

      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('ended', handleEnded)

      return () => {
        observer.disconnect()
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation - Transparent overlay */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        mounted && theme === 'dark' 
          ? 'bg-gray-900/80 border-b border-gray-700/50' 
          : 'bg-black/20'
      }`}>
        <div className="container mx-auto px-4 py-3">
          {/* Logo - Mobile and Desktop */}
          <div className="flex justify-center items-center mb-2 md:mb-0 md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-400" />
              <h1 className="text-2xl font-bold drop-shadow-lg bg-gradient-to-r from-green-300 via-green-400 via-green-500 via-emerald-400 to-green-300 bg-[length:400%_400%] bg-clip-text text-transparent animate-gradient-slow">
                Waste2Biotech
              </h1>
            </div>
          </div>
          
          {/* Navigation - Centered */}
          <div className="flex justify-center items-center">
            <MenuBar />
          </div>
          
          {/* Theme Toggle - Desktop Right */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
            <ThemeToggle />
          </div>
          
          {/* Theme Toggle - Mobile Center */}
          <div className="flex justify-center mt-2 md:hidden">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Video Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
        >
          <source src="/video/video2landing.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay Content */}
        <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-32">
          <div className="text-center max-w-4xl px-4">
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/20 text-white border-white/30 backdrop-blur-sm animate-pulse">
              Biyoteknolojinin Geleceği
            </Badge>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h3 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-500 dark:to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Hakkımızda
            </motion.h3>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-500 mx-auto rounded-full mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Sürdürülebilir gelecek için biyoteknoloji alanında yenilikçi çözümler geliştiriyoruz
            </motion.p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Odak Alanımız Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden h-full">
              <div className="relative h-48 overflow-hidden">
                 <Image
                   src="/about-images/t1.png"
                   alt="Biyoteknoloji Araştırması"
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-300"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               </div>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
                    <Recycle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  Odak Alanımız
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed">
                  Tarım ve gıda atıklarından biyoteknolojik üretime odaklanıyor, çevre dostu ve sürdürülebilir 
                  alternatifler sunarak döngüsel ekonomiye katkıda bulunmayı hedefliyoruz.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Sürdürülebilirlik
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    Çevre Dostu
                  </Badge>
                </div>
              </CardContent>
              </Card>
            </motion.div>

            {/* Yeniliklerimiz Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden h-full">
              <div className="relative h-48 overflow-hidden">
                 <Image
                   src="/about-images/t2.jpg"
                   alt="Bitki Doku Kültürü"
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-300"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
               </div>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Beaker className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  Yeniliklerimiz
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed">
                  Protik iyonik sıvılar kullanarak laktik asit üretimi konusunda öncü araştırmalar yapıyor, 
                  daha temiz, verimli ve ekonomik üretim yöntemleri geliştiriyoruz.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    İnovasyon
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Araştırma
                  </Badge>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-500 dark:to-teal-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ekibimiz
            </motion.h3>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            ></motion.div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/5 to-green-400/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '2.8s'}}></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.2s'}}></div>
                <div className="relative z-10">
              <CardHeader>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden relative">
                  <div className="absolute -inset-6 bg-green-400 rounded-full opacity-85 dark:opacity-95 blur-none animate-pulse shadow-2xl shadow-green-400/80 dark:shadow-green-400/90" style={{animationDuration: '3s'}}></div>
                  <div className="absolute -inset-5 bg-green-500 rounded-full opacity-70 dark:opacity-85 blur-sm animate-pulse shadow-xl shadow-green-500/70 dark:shadow-green-500/80" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-4 bg-green-300 rounded-full opacity-50 dark:opacity-65 blur-md animate-pulse shadow-lg shadow-green-300/60 dark:shadow-green-300/75" style={{animationDuration: '2s'}}></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/new_images/Ekin Selin Şahin-photoaidcom-cropped.jpeg"
                      alt="Ekin Selin Şahin"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle>Ekin Selin Şahin</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">AR-GE ve Proje Yürütücüsü</p>
              </CardHeader>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/5 to-green-400/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '2.8s'}}></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.2s'}}></div>
                <div className="relative z-10">
              <CardHeader>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden relative">
                  <div className="absolute -inset-6 bg-green-400 rounded-full opacity-85 dark:opacity-95 blur-none animate-pulse shadow-2xl shadow-green-400/80 dark:shadow-green-400/90" style={{animationDuration: '3s'}}></div>
                  <div className="absolute -inset-5 bg-green-500 rounded-full opacity-70 dark:opacity-85 blur-sm animate-pulse shadow-xl shadow-green-500/70 dark:shadow-green-500/80" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-4 bg-green-300 rounded-full opacity-50 dark:opacity-65 blur-md animate-pulse shadow-lg shadow-green-300/60 dark:shadow-green-300/75" style={{animationDuration: '2s'}}></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/new_images/Pınar Deniz Türkmen-photoaidcom-cropped.jpeg"
                      alt="Pınar Deniz Türkmen"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle>Pınar Deniz Türkmen</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Pazarlama ve İletişim Sorumlusu</p>
              </CardHeader>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/5 to-green-400/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '2.8s'}}></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.2s'}}></div>
                <div className="relative z-10">
              <CardHeader>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden relative">
                  <div className="absolute -inset-6 bg-green-400 rounded-full opacity-85 dark:opacity-95 blur-none animate-pulse shadow-2xl shadow-green-400/80 dark:shadow-green-400/90" style={{animationDuration: '3s'}}></div>
                  <div className="absolute -inset-5 bg-green-500 rounded-full opacity-70 dark:opacity-85 blur-sm animate-pulse shadow-xl shadow-green-500/70 dark:shadow-green-500/80" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-4 bg-green-300 rounded-full opacity-50 dark:opacity-65 blur-md animate-pulse shadow-lg shadow-green-300/60 dark:shadow-green-300/75" style={{animationDuration: '2s'}}></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/new_images/Sıla Karagüzel-photoaidcom-cropped.jpeg"
                      alt="Sıla Karagüzel"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle>Sıla Karagüzel</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Fermantasyon ve Mikrobiyoloji Araştırmacısı</p>
              </CardHeader>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/5 to-green-400/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '2.8s'}}></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.2s'}}></div>
                <div className="relative z-10">
              <CardHeader>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden relative">
                  <div className="absolute -inset-6 bg-green-400 rounded-full opacity-85 dark:opacity-95 blur-none animate-pulse shadow-2xl shadow-green-400/80 dark:shadow-green-400/90" style={{animationDuration: '3s'}}></div>
                  <div className="absolute -inset-5 bg-green-500 rounded-full opacity-70 dark:opacity-85 blur-sm animate-pulse shadow-xl shadow-green-500/70 dark:shadow-green-500/80" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-4 bg-green-300 rounded-full opacity-50 dark:opacity-65 blur-md animate-pulse shadow-lg shadow-green-300/60 dark:shadow-green-300/75" style={{animationDuration: '2s'}}></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/new_images/İlayda Aydemir-photoaidcom-cropped.jpeg"
                      alt="İlayda Aydemir"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle>İlayda Aydemir</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Analitik Kimya Araştırmacısı</p>
              </CardHeader>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/5 to-green-400/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '2.8s'}}></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.2s'}}></div>
                <div className="relative z-10">
              <CardHeader>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden relative">
                  <div className="absolute -inset-6 bg-green-400 rounded-full opacity-85 dark:opacity-95 blur-none animate-pulse shadow-2xl shadow-green-400/80 dark:shadow-green-400/90" style={{animationDuration: '3s'}}></div>
                  <div className="absolute -inset-5 bg-green-500 rounded-full opacity-70 dark:opacity-85 blur-sm animate-pulse shadow-xl shadow-green-500/70 dark:shadow-green-500/80" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-4 bg-green-300 rounded-full opacity-50 dark:opacity-65 blur-md animate-pulse shadow-lg shadow-green-300/60 dark:shadow-green-300/75" style={{animationDuration: '2s'}}></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/new_images/Sultan Ateş-photoaidcom-cropped.jpeg"
                      alt="Sultan Ateş"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle>Sultan Ateş</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Enstrümental Analiz Araştırmacısı</p>
              </CardHeader>
                </div>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 relative overflow-hidden border-2 border-green-400/30 shadow-lg shadow-green-400/20">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-green-500/5 to-green-400/10 animate-pulse" style={{animationDuration: '4s'}}></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3s'}}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.5s'}}></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '2.8s'}}></div>
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-green-400 to-transparent animate-pulse" style={{animationDuration: '3.2s'}}></div>
                <div className="relative z-10">
              <CardHeader>
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden relative">
                  <div className="absolute -inset-6 bg-green-400 rounded-full opacity-85 dark:opacity-95 blur-none animate-pulse shadow-2xl shadow-green-400/80 dark:shadow-green-400/90" style={{animationDuration: '3s'}}></div>
                  <div className="absolute -inset-5 bg-green-500 rounded-full opacity-70 dark:opacity-85 blur-sm animate-pulse shadow-xl shadow-green-500/70 dark:shadow-green-500/80" style={{animationDuration: '2.5s'}}></div>
                  <div className="absolute -inset-4 bg-green-300 rounded-full opacity-50 dark:opacity-65 blur-md animate-pulse shadow-lg shadow-green-300/60 dark:shadow-green-300/75" style={{animationDuration: '2s'}}></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                    <Image
                      src="/new_images/İbrahim Erkoç-photoaidcom-cropped.jpeg"
                      alt="İbrahim Erkoç"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <CardTitle>İbrahim Erkoç</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Finans ve Geliştirme Sorumlusu</p>
              </CardHeader>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl" style={{animation: 'pulse 8s ease-in-out infinite'}}></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" style={{animation: 'pulse 10s ease-in-out infinite'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 dark:bg-purple-500/5 rounded-full blur-3xl" style={{animation: 'pulse 12s ease-in-out infinite'}}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-500 dark:to-teal-600 bg-clip-text text-transparent leading-tight pb-2"
            >
              Vizyon & Misyon
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="h-1 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-500 mx-auto rounded-full"
            ></motion.div>
          </div>
          
          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Vision Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative h-full"
            >
              <Card className="relative bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 backdrop-blur-sm overflow-hidden rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col">
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-400/30">
                      <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">Vizyonumuz</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 flex-grow">
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                    Biyoteknoloji, yenilik ve çevresel sorumluluğu birleştirerek daha yeşil ve sürdürülebilir bir geleceğe
                    katkıda bulunmak ve toplumsal refah sağlamak.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300 border-green-300 dark:border-green-400/30">
                      Sürdürülebilirlik
                    </Badge>
                    <Badge className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-400/30">
                      İnovasyon
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative h-full"
            >
              <Card className="relative bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 backdrop-blur-sm overflow-hidden rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col">
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-300 dark:border-blue-400/30">
                      <Beaker className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">Misyonumuz</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 flex-grow">
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg">
                    Atıkları katma değerli ürünlere dönüştürerek çevrenin korunmasına ve yeşil teknolojilerin gelişimine
                    katkıda bulunmak.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-400/30">
                      Dönüşüm
                    </Badge>
                    <Badge className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-400/30">
                      Çevre Koruma
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Working Areas */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 backdrop-blur-sm rounded-2xl shadow-lg">
              <CardHeader className="text-center pb-8">
                <motion.div
                   initial={{ opacity: 0, scale: 0.8 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                   viewport={{ once: true, amount: 0.3 }}
                 >
                   <CardTitle className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-500 dark:to-teal-600 bg-clip-text text-transparent leading-tight py-2">
                     Çalışma Alanlarımız
                   </CardTitle>
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "8rem" }}
                     transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                     viewport={{ once: true, amount: 0.3 }}
                     className="h-1 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-500 mx-auto rounded-full"
                   ></motion.div>
                 </motion.div>
              </CardHeader>
            <CardContent>
               <div className="grid md:grid-cols-3 gap-8">
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative mb-4">
                      <div className="p-4 bg-green-100 dark:bg-green-500/20 rounded-full border border-green-300 dark:border-green-400/30 mx-auto w-fit">
                        <Recycle className="h-12 w-12 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-2">Sürdürülebilir Biyoprosesler</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Çevre dostu üretim süreçleri geliştirme
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative mb-4">
                      <div className="p-4 bg-blue-100 dark:bg-blue-500/20 rounded-full border border-blue-300 dark:border-blue-400/30 mx-auto w-fit">
                        <Beaker className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-300 mb-2">İyonik Sıvı Araştırmaları</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Yenilikçi kimyasal çözümler araştırma
                    </p>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center group hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative mb-4">
                      <div className="p-4 bg-orange-100 dark:bg-orange-500/20 rounded-full border border-orange-300 dark:border-orange-400/30 mx-auto w-fit">
                        <Leaf className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-orange-600 dark:text-orange-300 mb-2">Döngüsel Ekonomi</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      Atık yönetimi ve geri dönüşüm sistemleri
                    </p>
                  </motion.div>
               </div>
             </CardContent>
           </Card>
         </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-center mb-16">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-500 dark:to-teal-600 bg-clip-text text-transparent leading-tight py-2"
            >
              İletişim
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "8rem" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="h-1 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-blue-500 mx-auto rounded-full mb-8"
            ></motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-white/80 via-green-50/30 to-emerald-50/50 dark:from-gray-900/80 dark:via-gray-800/50 dark:to-green-900/20 backdrop-blur-sm border border-green-200/30 dark:border-green-800/30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-emerald-400/10 to-teal-400/10 animate-pulse"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent">
                Bizimle İletişime Geçin
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Sürdürülebilirlik ve biyoteknoloji yenilikleri konusunda tutkuluysanız, bizimle iletişime geçin!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                 <MovingBorderButton 
                   borderRadius="1.75rem"
                   className="bg-gradient-to-r from-emerald-500/90 via-green-500/90 to-teal-500/90 hover:from-emerald-600/90 hover:via-green-600/90 hover:to-teal-600/90 text-white border-0 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 px-8 py-4 font-semibold text-lg w-auto h-auto" 
                   containerClassName="w-auto h-auto"
                   borderClassName="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]"
                   duration={3000}
                   onClick={() => window.open('https://www.linkedin.com/in/waste2biotech-biotechnology-a73b3837b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank')}
                 >
                   <div className="flex items-center gap-3">
                     <svg className="h-6 w-6 transition-all duration-500 hover:rotate-12 hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                     </svg>
                     <span>LinkedIn</span>
                   </div>
                 </MovingBorderButton>
                 
                 <MovingBorderButton 
                   borderRadius="1.75rem"
                   className="bg-gradient-to-r from-blue-500/90 via-indigo-500/90 to-purple-500/90 hover:from-blue-600/90 hover:via-indigo-600/90 hover:to-purple-600/90 text-white border-0 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 px-8 py-4 font-semibold text-lg order-first sm:order-last w-auto h-auto" 
                   containerClassName="w-auto h-auto"
                   borderClassName="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--green-500)_40%,transparent_60%)]"
                   duration={3000}
                   onClick={() => window.location.href = 'mailto:waste2biotech@gmail.com'}
                 >
                   <div className="flex items-center gap-3">
                     <Mail className="h-6 w-6 transition-all duration-500 hover:bounce hover:scale-110" />
                     <span>E-posta</span>
                   </div>
                 </MovingBorderButton>
               </div>
              
              <div className="flex justify-center items-center gap-3 text-muted-foreground pt-6 border-t border-green-200/30 dark:border-green-800/30">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                <span className="text-lg font-medium">Türkiye</span>
              </div>
             </CardContent>
           </Card>
         </motion.div>
       </div>
     </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/40 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="font-semibold">Waste2Biotech</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Waste2Biotech. Sürdürülebilir gelecek için biyoteknoloji.
          </p>
        </div>
      </footer>
    </div>
  )
}
