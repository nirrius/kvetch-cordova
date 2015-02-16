var should = require('should')
var Thread = require('../../assets/javascripts/helpers/tree_to_thread.js')


describe('tree_to_thread', function() {

  it('empty message', function() {
    var thread = new Thread({})
    console.log(JSON.stringify(thread, null, '  '))

    should.exist(thread)
  })

  it('one message', function() {
    var message = {text: 'hi'}
    var thread = new Thread(message)
    console.log(JSON.stringify(thread, null, '  '))

    should.exist(thread)
    thread.messages[0].text.should.equal('hi')
    thread.messages.length.should.equal(1)
  })

  it('simple chain', function() {
    var message = {
      text: 'hi',
      children: [
        {
          text: 'foo',
          children: [
            {
              text: 'bar'
            }
          ]
        }
      ]
    }
    var thread = new Thread(message)
    console.log(JSON.stringify(thread, null, '  '))

    should.exist(thread)
    thread.messages[0].text.should.equal('hi')
    thread.messages[1].text.should.equal('foo')
    thread.messages[2].text.should.equal('bar')
    thread.messages.length.should.equal(3)
  })

  it('branching', function() {
    var message = {
      text: 'hi',
      children: [
        {
          text: 'foo',
          children: [
            {
              text: 'bar'
            }
          ]
        },
        {
          text: 'boo',
          children: [
            {
              text: 'bar'
            },
            {
              text: 'baz'
            },
            {
              text: 'caz'
            }
          ]
        }
      ]
    }
    var thread = new Thread(message)
    console.log(JSON.stringify(thread, null, '  '))

    should.exist(thread)
    thread.messages[0].text.should.equal('hi')
    thread.messages[1].text.should.equal('foo')
    thread.messages[2].text.should.equal('bar')
    thread.messages.length.should.equal(3)

    thread.messages[0].branching_threads.length.should.equal(1)
    thread.messages[0].branching_threads[0].messages.length.should.equal(2)
    thread.messages[0].branching_threads[0].messages[0].text.should.equal('boo')
    thread.messages[0].branching_threads[0].messages[1].text.should.equal('bar')
    thread.messages[0].branching_threads[0].messages[0].branching_threads.length.should.equal(2)

  })

})
