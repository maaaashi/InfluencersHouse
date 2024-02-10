export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <section className='rounded-xl shadow-lg p-8 m-4 w-full max-w-md bg-white'>
        <div className='text-lg mb-4'>管理者ログイン</div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            ユーザーID
          </label>
          <input
            type='text'
            igo-5
            className='mt-1 block w-full border-gray-300 shadow-sm input-bordered sm:text-sm input'
          />
        </div>
        <button className='btn btn-primary'>登録</button>
      </section>
    </div>
  )
}
