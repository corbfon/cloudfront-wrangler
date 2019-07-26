const error = require('./error')


describe('error', () => {
    let consoleSpy 
    let exitSpy
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation()
        exitSpy = jest.spyOn(process, 'exit').mockImplementation()
    })
    afterAll(() => {
        consoleSpy.mockRestore()
        exitSpy.mockRestore()
    })
    it('should log an error message', () => {
        const message = 'unique error message'
        error(new Error(message))
        expect(consoleSpy).toBeCalledWith(message)
    })
    it('should log a message if not passed an error', () => {
        const message = 'unique error message 2'
        error(message)
        expect(consoleSpy).toBeCalledWith(message)
    })
    it('should exit the process', () => {
        error('it didnt work', true)
        expect(exitSpy).toBeCalledWith(1)
    })
})