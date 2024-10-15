import mongoose from 'mongoose';

// interface for tickets attributes
interface TicketsAttrs {
  title: string;
  price: number;
  userId: string;
}

// interface for tickets document
interface TicketsDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// interface for tickets Model
interface TicketsModel extends mongoose.Model<TicketsDoc> {
  build(attrs: TicketsAttrs): TicketsDoc;
}

const ticketsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// ticketsSchema.pre('save', async function (done) {
//   if (this.isModified('password')) {
//     const hashed = await PasswordManager.toHash(this.get('password'));
//     this.set('password', hashed);
//   }

//   done();
// });

ticketsSchema.statics.build = (attrs: TicketsAttrs) => {
  return new Tickets(attrs);
};

const Tickets = mongoose.model<TicketsDoc, TicketsModel>(
  'Tickets',
  ticketsSchema
);

export { Tickets };
