import { useState, useEffect } from "react"
import Main from "../../components/layout/Main"
import Head from "next/head"
import { Formik, Form, FormikValues } from "formik"
import TextField from "../../components/formik/TextField"
import ButtonSubmit from "../../components/formik/ButtonSubmit";
import { useMutation, useQuery } from "react-query";
import { Api } from "../../lib/Api";
import { useDebounce } from "../../utils/Hooks"



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

interface Iwords {
    [index: number]: {
        variants: any,
        meanings: any,
    };
}


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
            setWords({})
        }
    }, [dataWords])

    useEffect(() => {
        if (search === "") {
            setKanji({})
            setReading({})
            setWords([])
        } else {
            mutateKanji(search, {
                // onSuccess: (res) => {
                //     console.log("onSuccess res ", res)
                // },
                // onError: (res) => {
                //     console.log("onError res ", res)
                // }
            })
            mutateReading(search, {
                // onSuccess: (res) => {
                //     console.log("onSuccess res ", res)
                // },
                // onError: (res) => {
                //     console.log("onError res ", res)
                // }
            })
            mutateWords(search, {
                // onSuccess: (res) => {
                //     console.log("onSuccess res ", res)
                // },
                // onError: (res) => {
                //     console.log("onError res ", res)
                // }
            })
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
                    <div className={"flex flex-col w-full"}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                        />
                    </div>
                    <div className={"mb-8"}>
                        <div>kanji</div>
                        {JSON.stringify(kanji, null, 4)}
                    </div>
                    <div className={"mb-8"}>
                        <div>reading</div>
                        {JSON.stringify(reading, null, 4)}
                    </div>
                    <div className={"mb-8"}>
                        <div>words</div>
                        {JSON.stringify(words, null, 4)}
                    </div>
                    {/* <Formik
                        initialValues={initFormikValue}
                        enableReinitialize={true}
                        onSubmit={handleSubmit}
                    >
                        {() => {
                            return (
                                <Form>
                                    <div className="mb-4">
                                        <TextField
                                            label={"Search"}
                                            name={"search"}
                                            type={"search"}
                                            placeholder={"search"}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <ButtonSubmit
                                            label={"Search"}
                                        // loading={isLoading}
                                        // disabled={isLoading}
                                        />
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik> */}
                </div>
            </div>
        </Main>
    )
}

export default Search;