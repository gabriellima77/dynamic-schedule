
class Week {
  constructor() {
    this.days = []
  }
}

class Day {
  constructor(date) {
    this.tasks = [];
    this.date = (date)? new Date(date): new Date();
  }
}

class Task {
  constructor(name, time) {
    this.name = name;
    this.time = time;
    this.isDaily = false;
    this.isChecked = false;
  }
}

export default {Week, Day, Task};