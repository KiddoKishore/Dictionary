import React, { useState, useEffect } from 'react'
import image from '../images/image.png'

const Search = () => {
    const [ input, setInput ] = useState('');
    const [ results, setResults ] = useState('');
    const [ meaning, setMeaning ] = useState(false);
    const [ error, setError ] = useState(false);

    const handleWordEnter = () => {
        setMeaning(true);
        setError(false);
      };

      const handleLogin = () => {
        setError(false);
        setMeaning(false);
      };

      async function dictionary() {
        try {
          const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
          );
          const data = await response.json();
          setResults(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      const submitHandler = async (e) => {
        e.preventDefault();
        await dictionary();
        console.log(results)
      }

      useEffect(() => {
        if (results.title === "No Definitions Found") {
          setMeaning(false);
          setError(true);
        } else if (results) {
          handleWordEnter();
        }
      }, [results, results?.title]);

  return (
    <div>
        { !meaning && !error ? (
            <div>
                <form className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                    <input type="text" placeholder="Search anything" className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3" onClick={submitHandler}>
                        Search
                    </button>
                </form>
                <img src={image} alt='' className='m-auto w-96'/>
            </div>
        ) : !meaning && error ? (
            <div>
                <h1>
                Sorry we couldn't find definitions for the word you were looking for. click below to search a new word
                </h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Click Here</button>
            </div>
        ) : (
            meaning && !error && results[0]?.word && (
                <div>
                    <form className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                        <input type="text" placeholder="Search anything" className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3" onClick={submitHandler}>
                            Search
                        </button>
                    </form>
                    
                    <div className='flex flex-col justify-center text-left mx-24 my-10 bg-black text-red-600 rounded'>
                    <div className='text-white m-5 text-xl'>
                        <h2>{results[0]?.word.toUpperCase()}</h2>
                    </div>
                    <div>
                            {results && (
                                <div className='bg-white mx-5 px-5 my-2 py-2 list-none'>
                                    <p className='text-black py-2'>Pronouciation: </p>
                                    <br></br>
                                    <p>
                                    {results[0]?.phonetics.map((x) => {
                                        return <li> {x.text}</li>;
                                    })}
                                    </p>
                                </div>
                                )}
                    </div>

                    <div className='bg-white mx-5 px-5 my-2 py-2'>
                        <div className='text-black py-2'>
                            {results && <h2>Part Of Speech:</h2>}
                        </div>
                        <ul>
                            {results[0].meanings.map((x, index) => {
                                return <li key={index}> {x.partOfSpeech}</li>;
                            })}
                        </ul>
                    </div>

                    <div className='bg-white mx-5 px-5 my-2 py-2 mb-5'>
                        <div>{results && <h2 className='text-black py-2'>Definitions</h2>}</div>

                        <div>
                            <ul>
                                {results[0].meanings.map((x) => {
                                    return x.definitions.map((obj) => {
                                    return <li>{obj.definition}</li>;
                                    });
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            )
        )}
    </div>
  )
}

export default Search