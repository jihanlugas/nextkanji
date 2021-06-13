import { useState, useEffect } from "react"
import Main from "../../components/layout/Main"
import Head from "next/head"
import { Formik, Form, FormikValues } from "formik"
import TextField from "../../components/formik/TextField"
import ButtonSubmit from "../../components/formik/ButtonSubmit";
import { useMutation, useQuery } from "react-query";
import { Api } from "../../lib/Api";
import { useDebounce } from "../../utils/Hooks"
import { isEmptyObject } from "../../utils/Validate"



interface Ikanji {
    kanji?: string,
    grade?: number,
    stroke_count?: number,
    meanings?: string[],
    kun_readings?: string[],
    on_readings?: string[],
    name_readings?: string[],
    jlpt?: number | null,
    unicode?: string,
}

interface Ireading {
    reading?: string,
    main_kanji?: string[],
    name_kanji?: string[],
}

interface Iword {
    variants: any,
    meanings: any,
}

interface Iwords extends Array<Iword> { }


interface Idata {
    kanji: Ikanji,
    reading: Ireading,
    words: Iwords,
}

const initFormikValue = {
    search: ""
}

const Search = () => {
    const [data, setData] = useState<Idata>({
        kanji: {},
        reading: {},
        words: [],
    })

    const [search, setSearch] = useState<string>("")
    const debounceSearch = useDebounce(search, 1000)


    const [kanji, setKanji] = useState<Ikanji>({})
    const [reading, setReading] = useState<Ireading>({})
    const [words, setWords] = useState<Iwords>([])

    // const { data: dataKanji, isLoading, error } = useQuery("kanji", () => Api.get(`/kanji/${search}`))

    // console.log("dataKanji ", dataKanji) 
    // console.log("kanji ", kanji)

    const { data: dataKanji, mutate: mutateKanji } = useMutation((val: string) => Api.get(`/kanji/${val}`))
    const { data: dataReading, mutate: mutateReading } = useMutation((val: string) => Api.get(`/reading/${val}`))
    const { data: dataWords, mutate: mutateWords } = useMutation((val: string) => Api.get(`/words/${val}`))

    const handleSubmit = (values: FormikValues) => {

    }

    useEffect(() => {
        if (dataKanji && !dataKanji.error) {
            setKanji(dataKanji)
        } else {
            setKanji({})
        }
    }, [dataKanji])

    useEffect(() => {
        if (dataReading && !dataReading.error) {
            setReading(dataReading)
        } else {
            setReading({})
        }
    }, [dataReading])

    useEffect(() => {
        if (dataWords && !dataWords.error) {
            setWords(dataWords)
        } else {
            setWords([])
        }
    }, [dataWords])

    useEffect(() => {
        if (search === "") {
            setKanji({})
            setReading({})
            setWords([])
        } else {
            mutateKanji(search)
            mutateReading(search)
            mutateWords(search)
        }
    }, [debounceSearch])


    return (
        <Main>
            <Head>
                <title>Search Kanji</title>
            </Head>
            <div className={"p-4"}>
                <div className={"mb-4"}>
                    <div className={"text-2xl"}>Search Kanji</div>
                </div>
                <div className={""}>
                    <div className={"flex flex-col w-full mb-8"}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                        />
                    </div>
                    {!isEmptyObject(kanji) && (
                        <div className={"mb-8"}>
                            <div className={"text-2xl font-bold"}>kanji</div>
                            <div className={"text-lg"}>{kanji.kanji}</div>
                            <div className={""}>Grades: {kanji.grade}</div>
                            <div className={""}>Stroke: {kanji.stroke_count}</div>
                            {kanji.meanings.length > 0 && (
                                <div>
                                    <div className={""}>Meanings: </div>
                                    <div className={"flex flex-row"}>
                                        {kanji.meanings.map((meaning, key) => {
                                            return (
                                                <div className={"mr-4 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{meaning}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                            )}
                            {kanji.kun_readings.length > 0 && (
                                <div>
                                    <div className={""}>Kun Readings: </div>
                                    <div className={"flex flex-row"}>
                                        {kanji.kun_readings.map((kun, key) => {
                                            return (
                                                <div className={"mr-4 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{kun}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                            )}
                            {kanji.on_readings.length > 0 && (
                                <div>
                                    <div className={""}>On Readings: </div>
                                    <div className={"flex flex-row"}>
                                        {kanji.on_readings.map((on, key) => {
                                            return (
                                                <div className={"mr-4 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{on}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                            )}
                            {kanji.name_readings.length > 0 && (
                                <div>
                                    <div className={""}>Name Readings: </div>
                                    <div className={"flex flex-row"}>
                                        {kanji.name_readings.map((name, key) => {
                                            return (
                                                <div className={"mr-4 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{name}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                            )}
                        </div>
                    )}
                    {!isEmptyObject(reading) && (
                        <div className={"mb-8"}>
                            <div className={"text-2xl font-bold"}>reading</div>
                            <div className={"text-lg"}>{reading.reading}</div>
                            {reading.main_kanji.length > 0 && (
                                <div>
                                    <div className={""}>Main Kanji: </div>
                                    <div className={"flex flex-row"}>
                                        {reading.main_kanji.map((main, key) => {
                                            return (
                                                <div className={"mr-4 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{main}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                            )}
                            {reading.name_kanji.length > 0 && (
                                <div>
                                    <div className={""}>Name Kanji: </div>
                                    <div className={"flex flex-row"}>
                                        {reading.name_kanji.map((name, key) => {
                                            return (
                                                <div className={"mr-4 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{name}</div>
                                            )
                                        })}
                                    </div>
                                </div>

                            )}
                        </div>
                    )}
                    {words.length > 0 && (
                        <div className={"mb-8"}>
                            <div className={"text-2xl font-bold"}>Words</div>
                            {words.map((word, key) => {
                                return (
                                    <div key={key} className={"mb-2"}>
                                        {word.variants.length > 0 && (
                                            <div className={"mb-2"}>
                                                <div className={"font-bold"}>Variants</div>
                                                {word.variants.map((variant, key) => {
                                                    return (
                                                        <div key={key}>
                                                            <div className={""}>Written: {variant.written}</div>
                                                            <div className={""}>Pronounced: {variant.pronounced}</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                        {word.meanings.length > 0 && (
                                            <div className={"mb-2"}>
                                                <div className={"font-bold"}>Meanings</div>
                                                {word.meanings.map((meaning, key) => {
                                                    return (
                                                        <div key={key}>
                                                            {meaning.glosses.length > 0 && (
                                                                <div>
                                                                    <div className={"font-bold"}>Glosses</div>
                                                                    {meaning.glosses.map((gloss, key) => {
                                                                        return (
                                                                            <div key={key}>{gloss}</div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Main >
    )
}

export default Search;