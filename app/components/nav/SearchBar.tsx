'use client'

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const SearchBar = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) =>{
        if(!data.searchTerm) return router.push('/')

        const url = queryString.stringifyUrl({
            url: '/',
            query:{
                searchTerm: data.searchTerm
            }
        },{skipNull: true})

        router.push(url)
        reset()
    }

    return (
      <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
        <input 
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
          placeholder="Search for groceries, e.g. Tomatoes"
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:bourder-[0.5px] focus:border-slate-500 w-80"
        />
        <button type="submit" className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md">Search</button>
      </form>
    );
}
 
export default SearchBar;