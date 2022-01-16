'video/webm; codecs=vp9' 
  mediaRecorder = new MediaRecorder(stream, options);

  
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;

  



function handleDataAvailable(e) {
  console.log('video data available');
  recordedChunks.push(e.data);
}


async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm; codecs=vp9'
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save video',
    defaultPath: `vid-${Date.now()}.webm`
  });

  if (filePath) {
    writeFile(filePath, buffer, () => console.log('video saved successfully!'));
  }

}