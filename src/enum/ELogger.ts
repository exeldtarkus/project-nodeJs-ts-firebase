enum ELogLevels {
  error = '[ERROR]',
  warn = '[WARNING]',
  info = '[INFO]',
  http = '[HTTP]',
  debug = '[DEBUG]',
  trace = '[TRACE]',
  fatal = '[FATAL]',
  nothing = '[NOTHING]',
}

enum ELogStage {
  start = '[START]',
  process = '[PROCESSING]',
  end = '[END]',
}

export {ELogLevels, ELogStage};
