function App() {
  return <div style={{padding:40,fontFamily:'sans-serif',background:'#f0f0f0',minHeight:'100vh'}}>
    <h1>✅ React is working!</h1>
    <p>Demo query param: {new URLSearchParams(window.location.search).get('demo') || 'none'}</p>
  </div>
}

export default App
