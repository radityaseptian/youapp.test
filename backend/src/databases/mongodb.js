import mongoose from 'mongoose'
import 'dotenv/config'

await mongoose.connect(process.env.MONGO).catch((e) => {
  console.error(e)
  process.exit(1)
})

export default mongoose
