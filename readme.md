# 学习express框架

### 流程图

![服务端流程](http://www.plantuml.com/plantuml/svg/U9njah5Emp0GXdS_XSTM8c6FAjG191R4K3RKuJ0dnQfnBVjIO4HiL7q31jYG69YGs7YQfg-1xIGLJhhOlly-t-yxUUe8B5LtYf4aXHmVZ4NdwhUVxUzp_Vsq-rXdzUjc-_A--_nYp7XO2cb0KuToSE6OfC0O9GMGNEgGzc6IjikAq0wbH57mw1dcI_Fi99Gemd9T4fdyukpg_F9qDcVCIo7TL2pQlGyrwfvhiHuLjS14uu9hl6-Ee-CZBa2f6n2BSOjDiWwBSUwdA1QvgLmvYlguy_HWqzg_HmmC350vyB1z4tl09VRVURJJyc4OU3AvsAgm28Gpj2jVIqb7g9CBR8hwDdo5F-Dbl_a0)

#### 流程代码

```plantuml
@startuml
title express核心流程-服务端

participant express as exp
participant application as app
participant router
participant route
participant layer

exp -> app: app[http.METHODS]
app -> router: router[http.METHODS]
router -> route: route[http.METHODS]
route -> layer: new layer(/, callback)
route <- layer: route.stack.push(layer)
router <- route

router -> layer: new layer(path, callback)
router <- layer: router.stack.push(layer)

app <- router
exp <- app

exp -> app: http.createServer.listen
exp <- app

@enduml
```

![响应流程](http://www.plantuml.com/plantuml/svg/U9nbKJ5En30GxFqAbr343uW8kgyipagny3d6taXGdcYG41Ky054X8K65G3Iy9hblu8qTJj4rySxCxeozsKI2GCFM2Z9aKUAr3nZZzFmz_jvEdxlzwtqrFZwCFqyP206Q-Y37zvVfxcl_zY4XIcqDEX8-EHbjF3XQV5XDvKe2xwtHGAPtB2UuaaC_48PZQiLOk4az8WVBwfn3QjaHUHNmQi188Z4i9FkQFwe3rreKgMGwfzJbNCICM9y3wdme3zJ9fcbayLP3i4llMRLSvZ0yLyLRRP6wlbsDPoeF78LfiFO2zEN9QMduJpWaveNCRrbGc1-S4E-px2KXNhxOe6lv5_y1qw2uXm00)

#### 流程代码

```plantuml
@startuml
title express核心流程-响应流程

actor 客户端 as client
participant express as exp
participant application as app
participant router
participant route
participant layer

client -> exp: http.request
exp -> app: app.handle
app -> router: router.handle
router -> layer: layer.path === request.url
router <- layer

router -> route: route.method === request.method
route -> layer: layer.callback()
route <- layer
router <- route

app <- router
exp <- app
client <- exp

@enduml
```



### 参考资料

* [Express 源码仿制教程](https://wangzhechao.com/express_1/)