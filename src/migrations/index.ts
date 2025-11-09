import * as migration_20251109_132750__payloadcms_db_postgres_relationships_v2_v3 from './20251109_132750__payloadcms_db_postgres_relationships_v2_v3';
import * as migration_20251109_133103 from './20251109_133103';
import * as migration_20251109_135132 from './20251109_135132';
import * as migration_20251109_135941 from './20251109_135941';
import * as migration_20251109_140741 from './20251109_140741';

export const migrations = [
  {
    up: migration_20251109_132750__payloadcms_db_postgres_relationships_v2_v3.up,
    down: migration_20251109_132750__payloadcms_db_postgres_relationships_v2_v3.down,
    name: '20251109_132750__payloadcms_db_postgres_relationships_v2_v3',
  },
  {
    up: migration_20251109_133103.up,
    down: migration_20251109_133103.down,
    name: '20251109_133103',
  },
  {
    up: migration_20251109_135132.up,
    down: migration_20251109_135132.down,
    name: '20251109_135132',
  },
  {
    up: migration_20251109_135941.up,
    down: migration_20251109_135941.down,
    name: '20251109_135941',
  },
  {
    up: migration_20251109_140741.up,
    down: migration_20251109_140741.down,
    name: '20251109_140741'
  },
];
