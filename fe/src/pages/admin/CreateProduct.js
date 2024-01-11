import { apiCreateProduct } from 'apis'
import { Button, InputForm, MarkdownEditor, Select } from 'components'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getBase64 } from 'utils/helpers'

const CreateProduct = () => {
  const { categories, brands } = useSelector((state) => state.app)
  const {
    register,
    formState: { errors },
    reset,
    watch,
    handleSubmit
  } = useForm()

  const [payload, setPayload] = useState({
    description: ''
  })

  const [invalidFields, setInvalidFields] = useState([])
  const [hoverElement, setHoverElement] = useState([])

  const changeValue = useCallback(
    (e) => {
      setPayload(e)
    },
    [payload]
  )

  const [preview, setPreview] = useState([])

  const handlePreview = async (files) => {
    const imagesPreview = []
    for (let file of files) {
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        toast.warning('Dinh dang file k dung')
        return
      }
      const base64 = await getBase64(file)
      imagesPreview.push({ name: file.name, path: base64 })
    }
    setPreview(imagesPreview)
  }

  useEffect(() => {
    handlePreview(watch('images'))
  }, [watch('images')])

  const handleCreateProduct = async (data) => {
    const final = { ...data, ...payload }
    const formData = new FormData()
    for (let i of Object.entries(final)) formData.append(i[0], i[1])
  if(final.images) {
    for(let image of final.images)
    formData.append('images',image)
  }
    const response = await apiCreateProduct(formData)
  }
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Create new product</span>
      </h1>
      <div className="p-4 ">
        <form enctype="multipart/form-data" onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            label="Name product"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: 'Need fill this field'
            }}
            fullWidth
            placeholder="Name of new product"
          />
          <div className="w-full my-6 flex gap-4">
            <InputForm
              label="Price"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: 'Need fill this field'
              }}
              style="flex-1"
              placeholder="Price of new product"
              type="number"
              fullWidth
            />
            <InputForm
              label="Quantity"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: 'Need fill this field'
              }}
              style="flex-1"
              placeholder="Quantity of new product"
              type="number"
              fullWidth
            />
          </div>
          <div className="w-full my-6 flex gap-4">
            <Select
              label="Category"
              options={categories?.map((el) => ({
                code: el._id,
                value: el.title
              }))}
              register={register}
              id="category"
              validate={{ required: 'Need fill this field' }}
              errors={errors}
              style="flex-auto"
              fullWidth
            />
            <Select
              label="Brand"
              options={brands?.map((el) => ({ code: el._id, value: el.title }))}
              register={register}
              id="brand"
              validate={{ required: 'Need fill this field' }}
              errors={errors}
              style="flex-auto"
              fullWidth
            />
          </div>
          <MarkdownEditor
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setInvalidField={setInvalidFields}
          />
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="images">
              Upload Image
            </label>
            <input
              register={register}
              type="file"
              id="images"
              multiple
              {...register('images', { required: 'Need file' })}
            />
            {preview.length > 0 && (
              <div className="my-4 flex w-full gap-3 flex-wrap">
                {preview?.map((el, index) => (
                  <div
                    onMouseLeave={() => setHoverElement(null)}
                    onMouseEnter={() => setHoverElement(el.name)}
                    key={index}
                    className="w-fit relative"
                  >
                    <img
                      className="w-[200px] object-contain"
                      src={el.path}
                      alt="product"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="my-6">
            <Button type="submit" name="Add"></Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
