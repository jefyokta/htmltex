interface ConverterClass{
    call(method: keyof this, ...args:any[]):string
    except(method:string,...args:any[]):string
  }

export abstract class BaseConverter implements ConverterClass {
    call(method: keyof this, ...args: any[]) {
      if (typeof this[method] === "function" && method !== 'call') {
        return (this[method] as Function)(...args);
      }
      return this.except((method as string),...args)
    }

    except(method:string,...args:any[]): string {
        return '<div data="method-not-found">'
    }
  }

  
  export class Begin extends BaseConverter{
  
  
   
    figure(){
      return '<figure>'
    }
    enumerate(){
     return '<ol>'
  
    }
    itemize(){
      return '<ul>'
    }
    matrix(){
        
    }
    except(method:string,...args:any[]): string {
        return `<div content="${method}" begin="true"></div>`
    }
  
  
  }

  export class End extends BaseConverter{
    figure(){
        return '</figure>'
    }
    enumerate(){
       return '</ol>'
    
      }
    itemize(){
        return '</ul>'
      }
    except(method:string,...args: any[]): string {
        return `<div content="${method}" end="true"></div>`
    }
  
  }