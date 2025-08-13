import { Boards, BoardsSchema } from './board.schema';
import * as mongoose from 'mongoose';

describe('Boards Schema', () => {
  it('should be defined', () => {
    const Model = mongoose.model('Boards', BoardsSchema);
    const doc = new Model({
      boards: [],
      id: 1,
    });
    expect(doc).toBeDefined();
  });
});
