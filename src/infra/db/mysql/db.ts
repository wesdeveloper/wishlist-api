import knex, { Knex } from 'knex';
import assert from 'assert';
import knexfile from '../../../../knexfile';

const environment = process.env.NODE_ENV || 'development';
let clientConfig: Knex.Config<any> = knexfile.development;

if (environment === 'test') {
  clientConfig = knexfile.test;
}

class Database {
  private connection!: Knex<any, unknown[]>;

  private connect(): void {
    this.connection = knex(clientConfig);
  }

  public async checkConnection(): Promise<void> {
    const connection = this.getConnection();

    try {
      const [[{ result }]] = await connection.raw('SELECT 1+1 AS result');
      assert.strictEqual(result, 2);
    } catch {
      throw new Error('database connection problem...');
    }
  }

  public getConnection(): Knex<any, unknown[]> {
    if (!this.connection) {
      this.connect();
    }

    return this.connection;
  }

  public async closeConnection(): Promise<void> {
    await this.connection.destroy();
  }
}

export default new Database();
