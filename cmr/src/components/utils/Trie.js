export class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    for (let char of word) {
      if (!current.children[char]) {
        current.children[char] = new TrieNode();
      }
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  search(prefix) {
    let current = this.root;
    for (let char of prefix) {
      if (!current.children[char]) {
        return [];
      }
      current = current.children[char];
    }
    return this._findAllWords(current, prefix);
  }

  _findAllWords(node, prefix) {
    let words = [];
    if (node.isEndOfWord) {
      words.push(prefix);
    }
    for (let char in node.children) {
      words = words.concat(
        this._findAllWords(node.children[char], prefix + char)
      );
    }
    return words;
  }
}

export function buildTrieFromWords(items) {
  const trie = new Trie();
  items.forEach((item) => {
    const word = item.label.trim().toLowerCase(); // Assicurati che le parole siano uniformi
    trie.insert(word);
  });
  return trie;
}
