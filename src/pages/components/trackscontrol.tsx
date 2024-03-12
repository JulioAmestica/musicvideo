import React, { Component } from 'react'
import TrackControl from "./trackcontrol"

export default function TracksControl(props: tracksControlProps) {
  if (props.tracks == null) {
    return (
      <></>
    )
  }
  else {
    try {
      return (
        <>
            {props.tracks.tracks.map((track) => (
            <TrackControl track={track.track} id={track.track.id}></TrackControl>))}
        </>
      )
    }
    catch (err) {
      console.error("trackscontrol ==>"+err);
    }
  }
}

interface tracksControlProps {
  tracks?: any,
}