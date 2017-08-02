'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

if (process.env.NODE_ENV === 'development') devtools()

app.on('before-quit', () => {
  console.log('Quitting!! See u later 👋')
})

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hello World!',
    center: true,
    maximizable: false,
    show: false
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
    app.quit()
  })

  win.loadURL(`file://${__dirname}/renderer/index.html`)
})
